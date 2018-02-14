import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import LoginIcon from './LoginIcon';

import PubSub from 'pubsub-js';
import Server from './server';

const styles = {
	root: {
		width: '100%',
		zIndex: 100,
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

class AppHeader extends React.Component {
	state = {
		auth: true,
		anchorEl: null,
		serverName: '',
	};

	update = () => {
		Server.getInfo().then((info) => {
			this.setState({ serverName: info.serverName });
		});
	}

	componentDidMount = () => {
		this.update();
		PubSub.subscribe('CONFIG_CHANGE', this.update);
	}

	handleChange = (event, checked) => {
		this.setState({ auth: checked });
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleMainDrawer = () => {
		PubSub.publish('TOGGLE_MAIN_DRAWER');
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position='static'>
					<Toolbar>
						<IconButton className={classes.menuButton} color='inherit' aria-label='Menu' onClick={this.handleMainDrawer}>
							<MenuIcon />
						</IconButton>
						<Typography variant='title' color='inherit' className={classes.flex}>
							{this.state.serverName}
						</Typography>
						<LoginIcon />
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

AppHeader.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeader);
