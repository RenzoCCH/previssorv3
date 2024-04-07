import { FC } from "react";
import { QuestionParagrah } from "../../../../types/quiz/question";
import { useTranslation } from "react-i18next";

type props = {
  question: QuestionParagrah;
  index: number;
};

const QuestionParagraphComponent: FC<props> = ({
  question: { required, id, question },
  index,
}) => {
  const { t } = useTranslation();

  let validate = {};
  if (required) {
    validate = {
      // response: Yup.string().max(3000).required(t("quiz.required")),
    };
  }
  return (
    <div className="questionWrapper">
      <label className="question" htmlFor={id}>
        <span>{index + 1}.</span>
        {question}
      </label>
      {/* <Formik
        initialValues={{
          response: question.response || "",
        }}
        validationSchema={Yup.object().shape(validate)}
        onSubmit={(values) => {
          saveDispatch({
            type: quizTakenActions.saveQuestion,
            payload: {
              questionType: quizTakenActions.questionResponse,
              questionIndex: index,
              response: values.response,
            },
          });
        }}
      >
        {({ errors, handleSubmit, values, touched, handleBlur, setValues }) => {
          return (
            <form noValidate onSubmit={handleSubmit}>
              <Input
                value={values.response}
                onChange={(e) => {
                  setValues({ response: e.target.value });
                }}
                size={InputSize.lg}
                error={errors.response}
                id={id}
                name="response"
                onBlur={handleBlur}
                touched={touched.response}
                contentEditable
                focus
              />
              <div className="questionParagraphbuttons">
                <Button type="submit" className="no-shadow nextButton">
                  {t(isLast ? "quiz.finish" : "quiz.next")}
                </Button>
              </div>
            </form>
          );
        }}
      </Formik> */}
    </div>
  );
};

export default QuestionParagraphComponent;
