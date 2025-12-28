export class CustomError extends Error {
  constructor(status: number, message: string, name: string = "CustomError") {
    super(message);
    this.status = status;
    this.name = name;
  }
  status: number;
}

export class NotFoundError extends CustomError {
  constructor(message = "Not found") {
    super(404, message, "NotFoundError");
  }
}
export class ValidationError extends CustomError {
  constructor(message = "Invalid request") {
    super(400, message, "ValidationError");
  }
}

export class ConflictError extends CustomError {
  constructor(message = "Conflict") {
    super(409, message, "ConflictError");
  }
}
export class InternalServerError extends CustomError {
  constructor(message = "Internal server error") {
    super(500, message, "InternalServerError");
  }
}