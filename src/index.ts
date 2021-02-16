import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';
import * as moment from 'moment';

joplin.plugins.register({
	onStart: async function() {
		
		var dateFormat = await joplin.settings.globalValue('dateFormat');

		const formatMsToLocal = (ms: number) => {
			return moment(ms).format(dateFormat);
		}

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
