from app import db

class User(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    salt = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('admin', 'seller', 'buyer'), nullable=False)
    created_at = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.current_timestamp())

class Property(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.DECIMAL(10, 2), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    image_base64 = db.Column(db.Text, nullable=False)
    seller_id = db.Column(db.String(36), db.ForeignKey('user.id'))
    created_at = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.current_timestamp())

class Purchase(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    buyer_id = db.Column(db.String(36), db.ForeignKey('user.id'))
    property_id = db.Column(db.String(36), db.ForeignKey('property.id'))
    purchase_date = db.Column(db.TIMESTAMP, nullable=False, server_default=db.func.current_timestamp())
