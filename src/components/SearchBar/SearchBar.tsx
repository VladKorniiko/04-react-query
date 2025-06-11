import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import type { FormikHelpers } from "formik";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

interface FormValues {
  query: string;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const initialValues: FormValues = { query: "" };

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const query = values.query.trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
    resetForm();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => (
            <Form className={styles.form}>
              <Field
                className={styles.input}
                type="text"
                name="query"
                autoComplete="off"
                placeholder="Search movies..."
                autoFocus
              />
              <button className={styles.button} type="submit">
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </header>
  );
}
