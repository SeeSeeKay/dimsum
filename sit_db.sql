use real_estate;

CREATE TABLE Role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE Account (
    accId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    roleId INT,
    photo BLOB,
    bio TEXT,
    FOREIGN KEY (roleId) REFERENCES Role(id)
);

CREATE TABLE BuyerPropertySaved (
    accId INT,
    propertyId INT,
    PRIMARY KEY (accId, propertyId),
    FOREIGN KEY (accId) REFERENCES Account(accId),
    FOREIGN KEY (propertyId) REFERENCES Property(propertyId)
);

CREATE TABLE Rating (
    ratingId INT AUTO_INCREMENT PRIMARY KEY,
    points INT NOT NULL CHECK (points >= 1 AND points <= 5),
    review TEXT,
    buyerId INT,
    sellerId INT,
    createdDt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyerId) REFERENCES Account(accId),
    FOREIGN KEY (sellerId) REFERENCES Account(accId)
);

CREATE TABLE Property (
    propertyId INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    image BLOB,
    document BLOB,
    status VARCHAR(50) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    no_of_bedrooms INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    tag VARCHAR(50),
    viewCount INT DEFAULT 0,
    createdBy INT,
    updatedBy INT,
    purchasedBy INT,
    createdDt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedDt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    purchasedDt DATETIME,
    FOREIGN KEY (createdBy) REFERENCES Account(accId),
    FOREIGN KEY (updatedBy) REFERENCES Account(accId),
    FOREIGN KEY (purchasedBy) REFERENCES Account(accId)
);

CREATE TABLE Note (
    noteId INT AUTO_INCREMENT PRIMARY KEY,
    propertyId INT,
    description TEXT NOT NULL,
    FOREIGN KEY (propertyId) REFERENCES Property(propertyId)
);

CREATE TABLE PriceHistory (
    priceId INT AUTO_INCREMENT PRIMARY KEY,
    propertyId INT,
    amount DECIMAL(15, 2) NOT NULL,
    createdDt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (propertyId) REFERENCES Property(propertyId)
);

CREATE TABLE Contract (
    contractId INT AUTO_INCREMENT PRIMARY KEY,
    sellerId INT,
    agentId INT,
    createdDt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    terminatedDt DATETIME,
    FOREIGN KEY (sellerId) REFERENCES Account(accId),
    FOREIGN KEY (agentId) REFERENCES Account(accId)
);

CREATE TABLE Transaction (
    transactionId INT AUTO_INCREMENT PRIMARY KEY,
    contractId INT,
    buyerId INT,
    createdDt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('successful', 'failed') NOT NULL,
    FOREIGN KEY (contractId) REFERENCES Contract(contractId),
    FOREIGN KEY (buyerId) REFERENCES Account(accId)
);