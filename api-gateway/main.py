from fastapi import FastAPI

# Initialize the FastAPI application
app = FastAPI(
    title="Identity Access Management System",
    description="API Gateway for Group-1 IAM Project",
    version="1.0.0"
)

# Create a simple health-check route
@app.get("/")
def read_root():
    return {"status": "success", "message": "Welcome to the IAM API Gateway!"}