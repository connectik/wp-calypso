/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import CompactCard from 'components/card/compact';
import FormButton from 'components/forms/form-button';
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import FormTextarea from 'components/forms/form-textarea';
import FormTextInput from 'components/forms/form-text-input';
import Timezone from 'components/timezone';
import Site from 'blocks/site';
import { localize } from 'i18n-calypso';
import { updateConciergeSignupForm } from 'state/concierge/actions';
import { getConciergeSignupForm, getUserSettings } from 'state/selectors';
import PrimaryHeader from '../shared/primary-header';
import { recordTracksEvent } from 'state/analytics/actions';

class InfoStep extends Component {
	static propTypes = {
		signupForm: PropTypes.object,
		onComplete: PropTypes.func.isRequired,
		site: PropTypes.object.isRequired,
	};

	setTimezone = timezone => {
		this.props.updateConciergeSignupForm( { ...this.props.signupForm, timezone } );
	};

	setFieldValue = ( { target } ) => {
		this.props.updateConciergeSignupForm( {
			...this.props.signupForm,
			[ target.name ]: target.value,
		} );
	};

	canSubmitForm = () => {
		const { signupForm } = this.props;
		if ( ! signupForm.message ) {
			return false;
		}
		return !! signupForm.message.trim();
	};

	componentDidMount() {
		this.props.recordTracksEvent( 'calypso_concierge_book_info_step' );
	}

	render() {
		const {
			signupForm: { firstname, lastname, message, timezone },
			userSettings,
			translate,
		} = this.props;

		return (
			<div>
				<PrimaryHeader />
				<CompactCard className="book__info-step-site-block">
					<Site siteId={ this.props.site.ID } />
				</CompactCard>

				<CompactCard>
					<FormFieldset>
						<FormLabel htmlFor="firstname">{ translate( 'First Name' ) }</FormLabel>
						<FormTextInput
							name="firstname"
							placeholder={ userSettings.first_name }
							onChange={ this.setFieldValue }
							value={ firstname }
						/>
					</FormFieldset>
					<FormFieldset>
						<FormLabel htmlFor="lastname">{ translate( 'Last Name' ) }</FormLabel>
						<FormTextInput
							name="lastname"
							placeholder={ userSettings.last_name }
							onChange={ this.setFieldValue }
							value={ lastname }
						/>
					</FormFieldset>
					<FormFieldset>
						<FormLabel>{ translate( "What's your timezone?" ) }</FormLabel>
						<Timezone
							includeManualOffsets={ false }
							name="timezone"
							onSelect={ this.setTimezone }
							selectedZone={ timezone }
						/>
						<FormSettingExplanation>
							{ translate( 'Choose a city in your timezone.' ) }
						</FormSettingExplanation>
					</FormFieldset>

					<FormFieldset>
						<FormLabel>
							{ translate( 'What are you hoping to accomplish with your site?' ) }
						</FormLabel>
						<FormTextarea
							placeholder={ translate( 'Please be descriptive' ) }
							name="message"
							onChange={ this.setFieldValue }
							value={ message }
						/>
					</FormFieldset>

					<FormButton
						disabled={ ! this.canSubmitForm() }
						isPrimary={ true }
						type="button"
						onClick={ this.props.onComplete }
					>
						{ translate( 'Continue to calendar' ) }
					</FormButton>
				</CompactCard>
			</div>
		);
	}
}

export default connect(
	state => ( {
		signupForm: getConciergeSignupForm( state ),
		userSettings: getUserSettings( state ),
	} ),
	{
		updateConciergeSignupForm,
		recordTracksEvent,
	}
)( localize( InfoStep ) );
