import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';
const moment = require('moment');

function formatMsToLocal(ms: number) {
	return moment(ms).format('DD/MM/YYYY');
}

joplin.plugins.register({
	onStart: async function() {

		await joplin.commands.register({
			name: 'insertDate',
			label: 'Insert Date',
			iconName: 'fas fa-calendar',
			execute: async () => {
				await joplin.commands.execute("insertText", formatMsToLocal(new Date().getTime()));
				await joplin.commands.execute('editor.focus');
			},
		});

		await joplin.views.toolbarButtons.create('insertDate', 'insertDate', ToolbarButtonLocation.EditorToolbar);
	},
});
