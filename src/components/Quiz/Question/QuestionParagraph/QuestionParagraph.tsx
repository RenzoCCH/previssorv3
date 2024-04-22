import { type FC } from "react";
import { QuestionParagrah } from "../../../../types/quiz/question";
import { useTranslation } from "react-i18next";
import classes from "./QuestionParagraph.module.scss";
import Input from "../../../basicComponents/Input/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../basicComponents/Button/Button";
import { inputSize } from "../../../basicComponents/FocusInput/FocusInput";
import { useDispatch } from "react-redux";
import { saveAnswer, updateAnswer } from "../../../../store/quizSlice";
import { delayExecutionSync } from "../../../../utils/utils";

type props = {
  question: QuestionParagrah;
  index: number;
  isLast?: boolean;
};
type questionT = {
  question: string;
};

const QuestionParagraphComponent: FC<props> = ({
  question: { id, question, response, required },
  isLast = false,
  index,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    control,
    formState: {
      errors: { question: questionError },
    },
    handleSubmit,
  } = useForm<questionT>({
    defaultValues: {
      question: response,
    },
  });

  const onSubmit: SubmitHandler<questionT> = () => {
    dispatch(saveAnswer({ index }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.questionWrapper}>
      <label className={classes.question} htmlFor={`${id}`}>
        <span className={classes.number}>{index + 1}.</span>
        {question}
        <Controller
          name="question"
          control={control}
          rules={{
            required: { value: required!, message: t("validation.required") },
            maxLength: {
              value: 3000,
              message: t("validation.max", { max: 3000 }),
            },
          }}
          render={({ field }) => (
            <Input
              id={`question${index}`}
              {...field}
              onChange={(e) => {
                delayExecutionSync(() => {
                  dispatch(updateAnswer({ index, response: e.target.value }));
                }, 200);

                field.onChange(e);
              }}
              contentEditable
              error={questionError && questionError.message}
              size={inputSize.lg}
            />
          )}
        ></Controller>
      </label>
      <Button classList={["btn-lg"]} id="btn">
        {t(isLast ? "finish" : "next")}
      </Button>
    </form>
  );
};

export default QuestionParagraphComponent;
