/** @format */

/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';

/**
 * Internal dependencies
 */
import { getEditorNewPostPath } from 'state/ui/editor/selectors';

const TodoLinks = ( { steps } ) =>
	map( steps, ( { label, url }, stepName ) => (
		<div key={ stepName } className="steps__summary-entry todo">
			<a href={ url }>{ label }</a>
		</div>
	) );

export const TodoLinksConnected = connect( ( state, { siteId, siteSlug, translate } ) => ( {
	steps: {
		THEME: {
			label: translate( 'Choose a Theme' ),
			url: '/themes/' + siteSlug,
		},
		PAGES: {
			label: translate( 'Add additional pages' ),
			url: getEditorNewPostPath( state, siteId, 'page' ),
		},
		BLOG: {
			label: translate( 'Write your first blog post' ),
			url: getEditorNewPostPath( state, siteId, 'post' ),
		},
	},
} ) )( TodoLinks );

export const TodoLinksUnconnected = connect( ( state, { siteUrl, translate } ) => ( {
	steps: {
		JETPACK_CONNECTION: {
			label: translate( 'Connect to WordPress.com' ),
			url: '/jetpack/connect?url=' + siteUrl,
		},
		THEME: {
			label: translate( 'Choose a Theme' ),
			url: siteUrl + '/wp-admin/theme-install.php?browse=featured',
		},
		PAGES: {
			label: translate( 'Add additional pages' ),
			url: siteUrl + '/wp-admin/post-new.php?post_type=page',
		},
		BLOG: {
			label: translate( 'Write your first blog post' ),
			url: siteUrl + '/wp-admin/post-new.php',
		},
	},
} ) )( TodoLinks );
