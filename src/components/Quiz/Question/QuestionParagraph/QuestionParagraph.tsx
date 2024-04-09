import { FC } from "react";
import { QuestionParagrah } from "../../../../types/quiz/question";
import { useTranslation } from "react-i18next";
import FocusInput from "../../../basicComponents/FocusInput/FocusInput";

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
        <FocusInput />
      </label>
    </div>
  );
};

export default QuestionParagraphComponent;
