import { useEffect, useState } from "react"
import ChooseClass from "./choose-class";
import CreateQuiz from "./create-quiz";

const NewQuiz = () => {
    const [classSelected, setClassSelected] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const savedClass = localStorage.getItem("classSelected");
        if (savedClass) {
            setClassSelected(savedClass);
            setSubmitted(true);
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (classSelected.className) {
            localStorage.setItem("classSelected", JSON.stringify(classSelected));
            setSubmitted(true);
        } else {
            setSubmitted(false);
        }
    };

    const handleReset = () => {
        setSubmitted(false);
    }

    return (
        <div className="content">
            {(!submitted) ? (
                <ChooseClass
                    classSelected={classSelected}
                    setClassSelected={setClassSelected}
                    handleSubmit={handleSubmit}
                />
            ) : (
                <CreateQuiz
                    classSelected={classSelected}
                    setClassSelected={setClassSelected}
                    handleReset={handleReset}
                />
            )}
        </div>
    );
};

export default NewQuiz;