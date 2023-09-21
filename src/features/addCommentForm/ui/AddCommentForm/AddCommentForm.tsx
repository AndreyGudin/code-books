import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddCommentForm.module.scss';
import {
  addCommentFormActions,
  addCommentFormReducer
} from '../../model/slice/addCommentFormSlice';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/Stack';
import {
  getAddCommentFormError,
  getAddCommentFormText
} from '../../model/selectors/addCommentFormSelectors';

export interface addCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer
};

const AddCommentForm: FC<addCommentFormProps> = memo(
  ({ className = '', onSendComment = () => {} }: addCommentFormProps) => {
    const { t } = useTranslation();
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback(
      (value: string) => {
        dispatch(addCommentFormActions.setText(value));
      },
      [dispatch]
    );

    const onSentHandler = useCallback(() => {
      onSendComment(text ?? '');
      onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
      <DynamicModuleLoader reducers={reducers}>
        <HStack
          data-testid="AddCommentForm"
          justify="between"
          align="end"
          gap="8"
          max
          className={classNames(cls.addCommentForm, {}, [className])}
        >
          <Input
            data-testid="AddCommentForm.Input"
            className={cls.inputComment}
            placeholder={t('Введите текст комментария') ?? ''}
            value={text ?? ''}
            onChange={onCommentTextChange}
          />
          <Button data-testid="AddCommentForm.Button" onClick={onSentHandler}>
            {t('Отправить')}
          </Button>
        </HStack>
      </DynamicModuleLoader>
    );
  }
);

export default AddCommentForm;
