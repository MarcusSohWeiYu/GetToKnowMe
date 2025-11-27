//Use to redirect users to their dashboard page
import { redirect } from "next/navigation";

import Link from "next/link";
import Survey from "@/models/Survey";
import Question from "@/models/Question";

import connectMongo from "@/libs/db/mongoose";
import PublicSurvey from "@/components/survey/PublicSurvey";

const getData = async (surveyId) => {
    await connectMongo();

    const survey = await Survey.findById(surveyId);
    const questions = await Question.find({ surveyId: surveyId }).sort({ order: 1 });

    if (!survey) {

        //TODO: Redirect to a survey not found page
        redirect("/survey-not-found")
    }

    return { survey, questions };
}

export default async function PublicSurveyPage(props) {
    const { surveyId } = await props.params;

    const { survey, questions } = await getData(surveyId);

    return (
        <PublicSurvey survey={JSON.parse(JSON.stringify(survey))} questions={JSON.parse(JSON.stringify(questions))} />
    )
}