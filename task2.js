import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,  
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } 
}));

app.use(cookieParser());

app.get('/track', (req, res) => {
    if (!req.session.visitCounter) {
        req.session.visitCounter = 0;
    }

    req.session.visitCounter += 1;
    let sessionVisitCounter = req.session.visitCounter;
    console.log(`ID of Session is: ${req.session.id}, Visit_Counter: ${sessionVisitCounter}`);

    let cookieVisitCounter = parseInt(req.cookies.visit_counter) || 0;
    cookieVisitCounter += 1;

    res.setHeader('X-Visit-Count', sessionVisitCounter);
    res.cookie('visit_counter', cookieVisitCounter, { maxAge: 24 * 60 * 60 * 1000 });

    res.json({ visit_count: sessionVisitCounter });
});

app.listen(3005, () => {
    console.log('Server running on http://localhost:3005');
});
