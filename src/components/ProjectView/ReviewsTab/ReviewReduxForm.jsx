import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Field from '../../common/form/Field';
import ErrorMessage from '../../common/utils/ErrorMessage';
import RatingBox from './RatingBox';

import validate from './validate';

const ReviewForm = React.createClass({
  propTypes: {
    project: PropTypes.object,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  },
  render() {
    const {
      project,
      auth,
      fields: {
        comment,
        rating
      },
      handleSubmit,
      valid,
      // errors,
      submitFailed,
      submitting,
      onSave // passed from parent component (<Create> / <Edit>)
    } = this.props;
    console.log('Render LinkReduxForm', this.props);
    return (
      <form
        onSubmit={ handleSubmit(onSave(project, auth)) }
        className={ `ui form${valid ? '' : ' error'}` }
      >

      <Field
        label="Your rating:"
        showError={ submitFailed && rating.error }
        errorMessage={ rating.error }
      >
        <RatingBox score={ rating } />
      </Field>

        <Field
          label="Your comment:"
          showError={ submitFailed && comment.error }
          errorMessage={ comment.error }
        >
          <textarea rows="8" {...comment} rows="10" />
        </Field>

        { !valid && submitFailed &&
          <ErrorMessage>Fix invalid fields!</ErrorMessage>
        }

        <div className="form-action-bar">
          {auth.username &&
            <button
              className={ `ui btn${submitting ? ' loading button' : ''}` }
              disabled={ submitting }
              type="submit"
            >
              <span className={`octicon octicon-cloud-upload`}></span>
              {' '}
              SAVE
            </button>
          }
        </div>
      </form>
    );
  }
});
const ReviewReduxForm = reduxForm({
  form: 'review',
  fields: ['comment', 'rating'],
  validate
})(ReviewForm);

export default ReviewReduxForm;