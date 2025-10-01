from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import config
from models import db
from routes.user_routes import user_bp
from routes.admin_routes import admin_bp
import os


def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get("FLASK_CONFIG", "default")

    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)

    # ✅ JWT setup (important fix for your error)
    app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "super-secret-key")
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]  # Use Authorization header
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"

    jwt = JWTManager(app)

    # ✅ CORS setup
    CORS(
        app,
        resources={r"/*": {"origins": ["http://127.0.0.1:5173", "http://localhost:5173"]}},
        supports_credentials=True,
    )

    # Register blueprints
    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")

    # Auto-create tables if not already created
    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=app.config.get("DEBUG", True),  # fallback to True if not set
    )
