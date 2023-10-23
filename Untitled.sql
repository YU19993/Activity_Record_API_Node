-- Drop schema if it exists and create a new one named 'quest'
DROP SCHEMA IF EXISTS quest;
CREATE SCHEMA quest;
USE quest;

-- Create Participants table
CREATE TABLE Participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL
);

CREATE TABLE QuesterAllyRelationshipMappings (
    id CHAR(36) PRIMARY KEY,
    questerId INT NOT NULL,
    allyId INT NOT NULL,
    masterRelationshipId INT NOT NULL,
    relationshipDetail VARCHAR(255),
    inviteStatus INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create quests table
CREATE TABLE quests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    totalCount INT DEFAULT 0,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy INT,
    FOREIGN KEY (createdBy) REFERENCES Participants(id)
);

-- Create quest_records table
CREATE TABLE quest_instance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  questId INT,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  goalType INT NOT NULL,
  goalValue INT,
  goalUnit INT,
  goalPercentage FLOAT,
  status INT NOT NULL,
  rewardStatus INT NOT NULL,
  createdBy INT,
  privacyOption INT NOT NULL DEFAULT 1,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (questId) REFERENCES quests(id),
  FOREIGN KEY (createdBy) REFERENCES Participants(id)
);

-- Create quest_participants table
CREATE TABLE quest_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    questID INT,
    participantID INT,
    status INT NOT NULL,
    performance FLOAT NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (questID) REFERENCES quest_instance(id),
    FOREIGN KEY (participantID) REFERENCES Participants(id)
);

-- Create quest_benefactors table
CREATE TABLE quest_benefactors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    questID INT,
    benefactorID INT,
    status INT NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (questID) REFERENCES quest_instance(id),
    FOREIGN KEY (benefactorID) REFERENCES Participants(id)
);

-- Create quest_action_checkins table
CREATE TABLE quest_action_checkins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    questID INT,
    participantID INT,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (questID) REFERENCES quest_instance(id),
    FOREIGN KEY (participantID) REFERENCES Participants(id)
);

-- Create quest_comments table
CREATE TABLE quest_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    questID INT,
    participantID INT,
    comment TEXT NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (questID) REFERENCES quest_instance(id),
    FOREIGN KEY (participantID) REFERENCES Participants(id)
);

-- Insert a user with id 1
SELECT * FROM Participants;

-- Insert a user with id 0
INSERT INTO Participants (id, Email) VALUES (1, 'System Admin');

-- Sample data insertion
-- Adding sample data for quests and actions tables (assuming user with id 0 creates them)
INSERT INTO Participants (Email) VALUES("123@com");
INSERT INTO Participants (Email) VALUES("123@com");
INSERT INTO quests (name, description, createdBy) VALUES ('Happy', 'This is quest 1 description', 1);
INSERT INTO quests (name, description, createdBy) VALUES ('Open', 'This is quest description', 1);
INSERT INTO quests (name, description, createdBy) VALUES ('Read', 'This is quest description', 1);
INSERT INTO quests (name, description, createdBy) VALUES ('Book', 'This is quest 1 description', 1);

