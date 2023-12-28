# Expo Router Example

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-expo-app -e with-router
```

## 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)

# SQLite database
Maindb

## Tables

user(id, name, code)
subject(id, class, subject, acadyear)

other tables depending on the subjects marksheet

# Mongodb 

1* on Login, the app gets 'user' data from Mongodb
2* secondly, 'subject' data corresponding to the teachers code is gotten from Mongodb
3* thirdly, Marksheet Table is created corresponding to the subject, class and acadyear
4* copy all student name from a class and acadyear from Mongodb Table (classname + acadyear) to SQLite DB Table (classname + subject + acadyear)

5* when marksheet is saved, the data is copied from SQLite Table (classname + subject + acadyear) to corresponding Mongodb Table(classname + acadyear) under (subject) column

