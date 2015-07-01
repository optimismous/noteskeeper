var notesStorage;

(function () {
    var domStorage = localStorage;
    var notesKey = 'notes';

    notesStorage = {
        _notes: {},
        _init: function () {
            try {
                this._notes = JSON.parse(domStorage[notesKey]);
            } catch(e) {
                this._notes = {};
            }
        },
        putNote: function (key, note) {
            if (key && note instanceof Object) {
                this._notes[key] = note;
                domStorage[notesKey] = JSON.stringify(this._notes);
                return true;
            }

            return false;
        },
        getNotes: function () {
            return this._notes;
        },
        clear: function () {
            domStorage.removeItem(notesKey);
        },
        removeNote: function (key) {
            delete this._notes[key];

            domStorage[notesKey] = JSON.stringify(this._notes);
        }
    };

    notesStorage._init();
})();

