import { type JSX, type ReactNode, useEffect, useState } from 'react';

import { Header } from '@/components/Header';
import { Modal } from '@/components/Modal';
import { OpenModalButton } from '@/components/OpenModalButton';
import { ReactHookForm } from '@/components/ReactHookForm';
import { SubmissionsList } from '@/components/SubmissionsList';
import { UncontrolledForm } from '@/components/UncontrolledForm';
import { HIGHLIGHT_DURATION } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { clearNewSubmission } from '@/store/slices/formSlice';
import styles from '@/styles/App.module.css';

interface FormConfig {
  content: ReactNode;
  title: string;
}

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const { newSubmissionId, submissions } = useAppSelector((state) => state.form);

  const [highlightedId, setHighlightedId] = useState<null | string>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formConfig, setFormConfig] = useState<FormConfig>({ content: null, title: '' });

  useEffect((): (() => void) => {
    if (newSubmissionId) {
      setHighlightedId(newSubmissionId);
      const timer = setTimeout((): void => {
        setHighlightedId(null);
        dispatch(clearNewSubmission());
      }, HIGHLIGHT_DURATION);

      return (): void => {
        clearTimeout(timer);
      };
    }

    return (): void => {
      setHighlightedId(null);
    };
  }, [newSubmissionId, dispatch]);

  const openUncontrolledModal = (): void => {
    setFormConfig({ content: <UncontrolledForm onClose={closeModal} />, title: 'Uncontrolled Form' });
    setModalOpen(true);
  };

  const openRhfModal = (): void => {
    setFormConfig({ content: <ReactHookForm onClose={closeModal} />, title: 'React Hook Form' });
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.appMain}>
        <section className={styles.formButtons}>
          <OpenModalButton label="Open Uncontrolled Form" openModal={openUncontrolledModal} />
          <OpenModalButton label="Open React Hook Form" openModal={openRhfModal} />
        </section>

        <SubmissionsList highlightedId={highlightedId} submissions={submissions} />
      </main>

      <Modal isOpen={modalOpen} onClose={closeModal} title={formConfig.title}>
        {formConfig.content}
      </Modal>
    </div>
  );
}

export default App;
