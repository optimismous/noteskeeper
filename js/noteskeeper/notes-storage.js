var notesStorage;

(function () {
    var domStorage = localStorage;
    var notesKey = 'notes';

    notesStorage = {
        _notes: [],
        _init: function () {
            try {
                this._notes = JSON.parse(domStorage[notesKey]);
            } catch(e) {
                this._notes = [];
            }
        },
        putNote: function (note) {
            if (note instanceof Object) {
                this._notes.push(note);
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
        removeNote: function (note) {
            for (var i = 0, max = this._notes.length; i < max; i++) {
                if (this._notes[i].createdOn === note.createdOn) {
                    this._notes.splice(i, 1);
                    domStorage[notesKey] = JSON.stringify(this._notes);
                    return;
                }
            }
        }
    };

    notesStorage._init();
})();

