
# Authentication Application

A Authentication APIs




## Installation

Install Authentication Application with npm

1.First clone the Repository by pasting the command given below in the terminal.
```bash
  git clone https://github.com/astitva3110/authentication.git
```
 2.Change the link  of mongoDB atlas
    
## API
1.Signup

```bash
  localhost:8080/signup
```
```bash
  {
  "user": "Astitva",
  "email": "astitvarai3110@gmail.com",
  "password": "1234",
  "otp":"314235"
}
```
2.OTP check

```bash
  localhost:8080/otpsignup
```
```bash
  "otp":"314235",
  "verified":"true"
```
3.Login

```bash
  localhost:8080/login
```
```bash
  "email":"astitvarai3110@gmail.com",
  "password": "1234"
```
## Features

- Secure and safe login
- Signup through OTP 
- Password encryption for security
- Forgot Password and Update Password for users


