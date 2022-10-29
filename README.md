# zoti-personal-assistant
WhatsApp bot personal assistant automation in hebrew.

# יצירת משתמש שישמש בתור הבוט #
על מנת להשתמש בבוט צריך ליצור משתמש Whatsapp שיהיה הבוט.

### השגת מספר טלפון לבוט ###
שימוש באפליקציה 2ndline שמספקת לך מספר פיקטיבי שנשתמש בו על מנת ליצור ולאשר את המשתמש  
[ניתן להשתמש במדריך הזה](https://www.wikihow.com/Get-a-Fake-Number-for-WhatsApp)  

### שימוש ב-2 משתמשים בטלפון אחד
לאחר שהשגנו מספר טלפון, ניצור משתמש נוסף שישמש בתור הבוט  
[ניתן להשתמש במדריך הזה](https://www.gadgetsnow.com/how-to/how-to-use-dual-whatsapp-in-a-single-phone/articleshow/66089005.cms)

### שימוש בבוט ###
`git clone`  
`cd zoti-personal-assistant`  
`npm install`  
`npm start`  
עכשיו יופיע qr code ב-terminal שיש לסרוק אותו באמצעות המשתמש הפיקטיבי שיצרנו ואז הבוט יפעל


# מה הבוט יכול לעשות #
כתבו לבוט עזרה על מנת לראות פירוט על כל פעולה
- [x] עזרה
- [x] טיימר
- [x] קבלת בדיחה
- [x] קבלת ציטוט
- [x] קבלת עובדה

# הוספת  משתני סביבה #
צרו קובץ `.env` שיכיל את המשתני סביבה הבאים:  
* API_NINJAS_KEY=[צור פה מפתח](https://api-ninjas.com/profile)