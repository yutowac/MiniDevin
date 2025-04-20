import openai
from app.config import get_settings
from app.models import Message, ChatRequest, ChatResponse, CodeExecutionResult
from typing import List
import io
import sys
import contextlib
import traceback


class OpenAIService:
    def __init__(self):
        settings = get_settings()
        openai.api_key = settings.openai_api_key

    async def generate_response(self, request: ChatRequest) -> ChatResponse:
        client = openai.OpenAI()
        
        response = client.chat.completions.create(
            model="gpt-4-1106-preview",  # Using GPT-4.1 preview model
            messages=[{"role": m.role, "content": m.content} for m in request.messages],
            temperature=0.7,
        )
        
        assistant_message = Message(
            role="assistant",
            content=response.choices[0].message.content
        )
        
        code_execution = None
        if request.execute_code:
            code_execution = self._execute_python_code(assistant_message.content)
            
        return ChatResponse(
            message=assistant_message,
            code_execution=code_execution
        )
    
    def _execute_python_code(self, content: str) -> CodeExecutionResult:
        import signal
        
        code_blocks = []
        lines = content.split('\n')
        in_code_block = False
        current_block = []
        
        for line in lines:
            if line.startswith('```python'):
                in_code_block = True
                continue
            elif line.startswith('```') and in_code_block:
                in_code_block = False
                code_blocks.append('\n'.join(current_block))
                current_block = []
                continue
                
            if in_code_block:
                current_block.append(line)
        
        if not code_blocks:
            return CodeExecutionResult(
                output="No Python code blocks found in the response.",
                error=None
            )
        
        output_buffer = io.StringIO()
        error_message = None
        
        class TimeoutError(Exception):
            pass
        
        def timeout_handler(signum, frame):
            raise TimeoutError("Code execution timed out (10 seconds)")
        
        for code in code_blocks:
            try:
                signal.signal(signal.SIGALRM, timeout_handler)
                signal.alarm(10)
                
                with contextlib.redirect_stdout(output_buffer):
                    exec(code, {"__builtins__": __builtins__}, {})
                
                signal.alarm(0)
            except TimeoutError as e:
                error_message = str(e)
                break
            except Exception as e:
                error_message = f"Error: {str(e)}\n{traceback.format_exc()}"
                break
            finally:
                signal.alarm(0)
        
        return CodeExecutionResult(
            output=output_buffer.getvalue(),
            error=error_message
        )
