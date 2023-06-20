import axios from "axios";
import React, { useState } from "react"
import { Input, Switch } from "@nextui-org/react";
import Image from "next/image";
import Logo from "@/assets/logo/cnweb-30.png";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API;

const CreateQuiz = ({ classSelected, setClassSelected, handleReset }) => {
    const [submitOK, setSubmitOK] = useState(false);
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState();
    const [interval, setInterval] = useState(0);
    const [quizzed, setQuizzed] = useState(false);
    const [url, setURL] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const calculateEndTime = (startDate, startTime, interval) => {
            const startDateTime = new Date(`${startDate}T${startTime}`);
            startDateTime.setMinutes(startDateTime.getMinutes() + parseInt(interval));
            const endDateTime = startDateTime.toISOString();
            return endDateTime;
        }
        const startDateTime = new Date(`${startDate}T${startTime}`).toISOString();
        const endDateTime = calculateEndTime(startDate, startTime, interval);
        console.log(startDateTime, endDateTime)

        const data = {
            startTime: startDateTime,
            endTime: endDateTime,
            formLink: url,
            _class: classSelected.classID
        }

        console.log(data)
        axios.post(`${API}/quizzes`, data).then(response => {
            console.log(response.data);
            setSubmitOK(true);
            setStartDate();
            setStartTime();
            setInterval(0);
            setQuizzed(false);
            setURL("");
            setClassSelected({})
            localStorage.setItem("classSelected", JSON.stringify({}))
            console.log(classSelected, startDate, startTime, interval, quizzed, url);
        }).catch(error => {
            console.error(error)
            setSubmitOK(false);
        })
    };

    return (
        <>
            {!submitOK ? (
                <>
                    <h1>Create a new Quiz</h1>
                    <Image src={Logo}></Image>
                    <form className="form" onSubmit={handleSubmit}>
                        <label>Create a quiz in class {classSelected.className}</label>

                        <Input
                            className="input"
                            required
                            label="Start Date"
                            type="date"
                            onChange={(e) => setStartDate(e.target.value)}
                        />

                        <Input
                            className="input"
                            label="Start Time"
                            required
                            type="time"
                            onChange={(e) => setStartTime(e.target.value)}
                        />

                        <Input
                            className="input"
                            required
                            label="Interval (in minutes)"
                            type="number"
                            bordered
                            min={0}
                            max={120}
                            onChange={(e) => setInterval(e.target.value)}
                        />
                        <div className="switch">
                            <label>Google Form included?</label>
                            <Switch
                                className="input"
                                bordered
                                label="URL included?"
                                isSelected={quizzed}
                                onChange={(e) => setQuizzed(e.target.checked)}
                            />
                        </div>
                        {console.log(quizzed)}
                        {quizzed ? <Input
                            className="input"
                            label="Form URL"
                            required
                            type="url"
                            onChange={(e) => setURL(e.target.value)}

                        /> : <Input
                            className="input-disabled"
                            label="Form URL"
                            type="url"
                            disabled
                        />}
                        {console.log(`Class Name: ${classSelected.className}`)}
                        {console.log(`Start Date: `, startDate)}
                        {console.log(`Start Time: `, startTime)}
                        {console.log(`Interval: `, interval)}
                        {console.log(`URL: `, url)}

                        <button type="submit">Create</button>
                        <button onClick={handleReset}>Back</button>
                    </form>
                </>
            ) : (
                <>
                    <h1>The quiz is created sucessfully!</h1>
                    <br/>
                    <p>You can check detail or get the QR code by going to Dashboard - Quizzes</p>
                    <br/>
                    <button className="ok">
                        <Link href="/dashboard/quizzes">Let&apos;s go!</Link>
                        </button>
                </>
            )}
        </>
    );
};

export default CreateQuiz;