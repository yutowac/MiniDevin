FROM python:3.10-slim

WORKDIR /app

# Install Poetry
RUN pip install poetry==1.5.1

# Copy poetry configuration files
COPY pyproject.toml poetry.lock* ./

# Configure poetry to not create a virtual environment
RUN poetry config virtualenvs.create false

# Install dependencies
RUN poetry install --no-interaction --no-ansi

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["poetry", "run", "fastapi", "dev", "app/main.py", "--host", "0.0.0.0"]
