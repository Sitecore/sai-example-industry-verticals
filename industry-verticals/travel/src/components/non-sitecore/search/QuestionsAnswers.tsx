import { Accordion, Content, Header, Item, Trigger } from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { WidgetDataType, useQuestions, widget } from '@sitecore-search/react';

const SEARCH_CONFIG = {
  source: process.env.NEXT_PUBLIC_SEARCH_SOURCE as string,
};

type Question = {
  question: string;
  answer: string;
};

const MainQuestionComponent = ({ answer, question }: Question) => {
  return (
    <div className="border-border mb-6 border-b p-3">
      <h4 className="text-lg font-bold">{question}</h4>
      <p className="mt-2">{answer}</p>
    </div>
  );
};

type RelatedQuestionsProps = {
  relatedQuestions: Array<Question>;
};

const RelatedQuestionsComponent = ({ relatedQuestions = [] }: RelatedQuestionsProps) => {
  return (
    <div className="space-y-4">
      {relatedQuestions.length > 0 && (
        <Accordion type="multiple">
          <h4 className="text-md mb-4 font-bold">People also ask ...</h4>
          {relatedQuestions.map(({ answer, question }, index) => (
            <Item
              className="border-border w-full cursor-pointer py-4 not-last:border-b"
              value={`${answer}-${index}`}
              key={index}
            >
              <Header>
                <Trigger className="group flex w-full justify-between gap-x-2 text-sm">
                  <span className="font-semibold">{question}</span>
                  <ChevronDownIcon
                    height={20}
                    width={20}
                    className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </Trigger>
              </Header>
              <Content className="pt-5 text-sm font-light">{answer}</Content>
            </Item>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export const QuestionsAnswersComponent = ({
  defaultKeyphrase = '',
  defaultRelatedQuestions = 5,
}) => {
  const {
    queryResult: {
      data: {
        related_questions: relatedQuestionsResponse = [],
        answer: { answer, question } = {
          answer: undefined,
          question: undefined,
        },
      } = {},
    },
  } = useQuestions({
    state: {
      keyphrase: defaultKeyphrase,
      relatedQuestions: defaultRelatedQuestions,
    },
    query: (query) => {
      if (SEARCH_CONFIG.source !== '') {
        const sources = SEARCH_CONFIG.source.split('|');
        sources.forEach((source) => {
          query.getRequest().addSource(source.trim());
        });
      }
    },
  });

  return (
    <div>
      {((answer && question) || relatedQuestionsResponse.length > 0) && (
        <div className="border-border bg-background mb-8 rounded-lg border p-5 shadow-sm">
          {answer && question && <MainQuestionComponent answer={answer} question={question} />}
          {relatedQuestionsResponse.length > 0 && (
            <RelatedQuestionsComponent relatedQuestions={relatedQuestionsResponse} />
          )}
        </div>
      )}
    </div>
  );
};

const QuestionsAnswersWidget = widget(
  QuestionsAnswersComponent,
  WidgetDataType.QUESTIONS,
  'Articles'
);

export default QuestionsAnswersWidget;
