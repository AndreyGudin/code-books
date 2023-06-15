import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import type { FC } from 'react';

import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import {
  getAddCommentFormError,
  getAddCommentFormText
} from '../../model/selectors/addCommentFormSelectors';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddCommentForm.module.scss';
import {
  addCommentFormActions,
  addCommentFormReducer
} from 'features/addCommentForm/model/slice/addCommentFormSlice';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import type { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

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
        <div className={classNames(cls.addCommentForm, {}, [className])}>
          <Input
            className={cls.inputComment}
            placeholder={t('Введите текст комментария') ?? ''}
            value={text ?? ''}
            onChange={onCommentTextChange}
          />
          <Button onClick={onSentHandler}>{t('Отправить')}</Button>
        </div>
      </DynamicModuleLoader>
    );
  }
);

export default AddCommentForm;