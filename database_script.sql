SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS account;
CREATE TABLE `account` (
                           `accountKey` INT AUTO_INCREMENT NOT NULL,
                           `email` varchar(255) NOT NULL,
                           `username` varchar(255) NOT NULL,
                           `password` varchar(100) NOT NULL,
                           `schoolid` varchar(50) NOT NULL,
                           `active` boolean NOT NULL,
                           `usertype` varchar(100) NOT NULL,
                           `firstname` varchar(100) NOT NULL,
                           `middlename` varchar(100) NOT NULL,
                           `lastname` varchar(100) NOT NULL,
                           `address1` varchar(100) NOT NULL,
                           `address2` varchar(100) NOT NULL,
                           `city` varchar(100) NOT NULL,
                           `state` varchar(100) NOT NULL,
                           `zipcode` varchar(10) NOT NULL,
                           `school` varchar(100) NOT NULL,
                           `sex` varchar(6) NOT NULL,
                           `race` varchar(100) NOT NULL,
                           PRIMARY KEY (`accountKey`)
);

commit;

DROP TABLE IF EXISTS scholarship;
CREATE TABLE `scholarship` (
                               `scholarshipId` INT AUTO_INCREMENT NOT NULL,
                               `title` varchar(255) NOT NULL,
                               `organization` varchar(255) NOT NULL,
                               `description` varchar(100) NOT NULL,
                               `requirements` varchar(50) NOT NULL,
                               `amount` DOUBLE NOT NULL,
                               PRIMARY KEY (`scholarshipId`)
);

commit;


Select * from account;
Select * from scholarship;
SET FOREIGN_KEY_CHECKS=1;
# DROP TABLE IF EXISTS accountscholarship;
# CREATE TABLE `accountscholarship` (
#   `comboId` INT AUTO_INCREMENT NOT NULL,
#   `accountKey` INT NOT NULL,
#   `scholarshipId` INT NOT NULL,
#   PRIMARY KEY (`comboId`),
#   FOREIGN KEY (accountKey) REFERENCES account(accountKey),
#   FOREIGN KEY (scholarshipId) REFERENCES scholarship(scholarshipId)
# );
#
# commit;

# Select * from user;
# Select * from account;
# Select * from scholarship;
# Select * from accountscholarship