module('lively.morphic.TextExperiments').requires('cop.Layers', 'lively.morphic.Core', 'lively.morphic.TextCore').toRun(function() {


lively.morphic.Morph.subclass('lively.morphic.NewText', Trait('ScrollableTrait'), Trait('TextChunkOwner'),
'properties', {
    isText: true,
    allowInput: true,
    style: {
        borderWidth: 1,
        borderColor: Color.black,
        fill: Color.veryLightGray,
        fixedWidth: true,
        fixedHeight: true,
        enableGrabbing: false,
        enableDropping: false,
        allowInput: true,
        clipMode: 'visible',
        fontFamily: 'Helvetica',
        fontSize: 10,
        padding: Rectangle.inset(4, 2),
    },

    autoAdjustPadding: true,
    suppressDropping: true,
    draggingEnabled: true,
},
'initializing', {
    initialize: function($super, bounds, string) {
        $super(this.defaultShape());
        
        this.leanText = new lively.LeanText(this.renderContext().shapeNode);

        this.setExtent(pt(100,100));

        /*if (bounds) this.setBounds(bounds);
        this.textString = string || '';
        this.charsTyped = '';
        this.evalEnabled = false;
        this.fit();*/
    },


},
'styling', {
    applyStyle: function($super, spec) {
        $super(spec);

        return;
        // FIXME implement

        /*if (spec.fixedWidth !== undefined) {
            this.setFixedWidth(spec.fixedWidth);
            this.fit();
        }
        if (spec.fixedHeight !== undefined) this.setFixedHeight(spec.fixedHeight);
        if (spec.allowInput !== undefined) this.allowInput = spec.allowInput;
        if (spec.fontFamily !== undefined) this.setFontFamily(spec.fontFamily);
        if (spec.fontSize !== undefined) this.setFontSize(spec.fontSize);
        if (spec.textColor !== undefined) this.setTextColor(spec.textColor);
        if (spec.padding !== undefined) this.setPadding(spec.padding);
        if (spec.align !== undefined) this.setAlign(spec.align);
        if (spec.verticalAlign !== undefined) this.setVerticalAlign(spec.verticalAlign);
        if (spec.display !== undefined) this.setDisplay(spec.display);
        if (spec.whiteSpaceHandling !== undefined) this.setWhiteSpaceHandling(spec.whiteSpaceHandling);
        if (spec.syntaxHighlighting !== undefined) spec.syntaxHighlighting ? this.enableSyntaxHighlighting() : this.disableSyntaxHighlighting();
        if (spec.emphasize !== undefined) this.emphasizeAll(spec.emphasize);
        return this;*/
    },
},
'accessing', {
    setExtent: function($super, value) {
        $super(value);

        //FIXME anything?
        return;

        /*if (this.owner && this.owner.isInLayoutCycle) return;

        var textExtent = this.getTextExtent(),
            scrollbarExtent = this.getScrollBarExtent(),
            borderWidth = this.getBorderWidth(),
            padding = this.getPadding() || new Rectangle(0,0,0,0),
            width = null,
            height = null;

        if (this.fixedWidth) {
            width = value.x;
            if (this.showsVerticalScrollBar())
                width -= scrollbarExtent.x;
            width -= borderWidth*2;
            width -= padding.left() + padding.right();
            this.setMaxTextWidth(width);
            this.setMinTextWidth(width);
        } else {
            this.setMaxTextWidth(null);
            this.setMinTextWidth(null);
        }

        if (this.fixedHeight) {
            height = Math.max(value, textExtent.y); // FIXME shouldn't that be value.y? (max width ever used??)
            if (this.showsHorizontalScrollBar())
                height -= scrollbarExtent.y;
            height -= borderWidth*2;
            height -= padding.top() + padding.bottom();
            this.setMaxTextHeight(height);
            this.setMinTextHeight(height);
        } else {
            this.setMaxTextHeight(null);
            this.setMinTextHeight(null);
        }*/
    },

    getTextExtent: function() { 
        return this.leanText.getTextExtent();
    },
    getTextBounds: function() { 
        return pt(0,0).extent(this.getTextExtent()) 
    },
    visibleTextBounds: function() {
        return this.innerBounds().insetByRect(this.getPadding());
    },
    get textString() {

        return this.leanText.getText();
        /*
        // when the prototype property is accessed
        if (this === this.constructor.prototype) return;
        if (!this.cachedTextString)
            this.cachedTextString = this.renderContextDispatch('getTextString');
        return this.cachedTextString;*/
    },
    set textString(string) {

        this.leanText.setText(string);

        /*string = String(string);

        // setting the textString removes all the content in the text morph
        this.removeTextChunks();

        this.renderContextDispatch('updateText', string);

        this.cachedTextString = string;

        // bindings wrapper trigger already a change in textString
        // if (this.attributeConnections)
            // lively.bindings.signal(this, 'textString', string);

        return string;*/
    },

    setTextString: function(string) { return this.textString = string },
    getTextString: function() { return this.textString },
    appendTextString: function(string) { 
        return this.textString += string 
    },

    setTextColor: function(color) { 
        // FIXME implement
        return;
        // return this.morphicSetter('TextColor', color) 
    },
    getTextColor: function() { 
        // FIXME implement
        //return this.morphicGetter('TextColor') ||
        return Color.black 
    },
    setFontSize: function(size) { 
        //FIXME implement
        //return this.morphicSetter('FontSize', size)
        return;
    },
    getFontSize: function() { 
        // FIXME implement
        return 10;
        //return this.morphicGetter('FontSize') 
    },
    setFontFamily: function(fontName) { return this.morphicSetter('FontFamily', fontName) },
    getFontFamily: function() { return this.morphicGetter('FontFamily') },

    setPadding: function(rect) {
        this.shape.setPadding(rect);
        this.fit();
    },
    getPadding: function() { return this.shape.getPadding() },
    setAlign: function(align) { return this.morphicSetter('Align', align) },
    getAlign: function() { return this.morphicGetter('Align') },
    setVerticalAlign: function(valign) { return this.morphicSetter('VerticalAlign', valign) },
    getVerticalAlign: function() { return this.morphicGetter('VerticalAlign') },
    setDisplay: function(mode) { return this.morphicSetter('Display', mode) },
    getDisplay: function() { return this.morphicGetter('Display') },

    setFixedWidth: function(bool) {
        this.fixedWidth = bool;
        this.setWhiteSpaceHandling(bool ? 'pre-wrap' : 'pre');
        this.fit();
    },
    setFixedHeight: function(bool) {
        this.fixedHeight = bool
        this.fit();
    },
    setMaxTextWidth: function(value) {
        this.morphicSetter('MaxTextWidth', value);
    },
    setMaxTextHeight: function(value) { this.morphicSetter('MaxTextHeight', value) },
    setMinTextWidth: function(value) { this.morphicSetter('MinTextWidth', value) },
    setMinTextHeight: function(value) { this.morphicSetter('MinTextHeight', value) },


    getTextNode: function() { return this.renderContext().textNode },

},
'rendering', {

    growOrShrinkToFit: function() {
        if (this.getExtent() != this.getTextExtent()) {
            this.setExtent(this.getTextExtent());
        }
    },
    fit: function() {
        if (!this.owner || this.owner.isInLayoutCycle) return;

        this.setExtent(pt(this.getExtent().x, this.leanText.getHeight()));

        /*var extent = this.getExtent(),
            textExtent = this.getTextExtent(),
            borderWidth = this.getBorderWidth(),
            padding = this.getPadding(),
            paddingWidth = padding.left() + padding.right(),
            paddingHeight = padding.top() + padding.bottom(),
            width = this.fixedWidth ? extent.x : (textExtent.x + borderWidth*2 + paddingWidth),
            height = this.fixedHeight ? extent.y : (textExtent.y + borderWidth*2 + paddingHeight);
        this.setExtent(pt(width, height));*/
    },
},
'text modes', {
    beLabel: function(customStyle) {
        this.isLabel = true;
        var labelStyle = {
            fill: null,
            borderWidth: 0,
            fixedWidth: false,
            fixedHeight: true,
            allowInput: false,
            clipMode: 'hidden',
            handStyle: 'default',
        };
        if (customStyle) labelStyle = Object.merge([labelStyle, customStyle]);
        this.applyStyle(labelStyle);
        this.ignoreEvents();
        return this;
    },
    beInputLine: function(customStyle) {
        this.isInputLine = true;
        var inputLineStyle = {
            fixedWidth: false,
            fixedHeight: true,
            clipMode: 'hidden',
            allowInput: true,
        };
        if (customStyle) inputLineStyle = Object.merge([inputLineStyle, customStyle]);
        this.applyStyle(inputLineStyle);
        return this;
    },
},
'keyboard events', {

    onKeyDown: function(evt) {

        this.fit();
        return true;

        // FIXME special keys

        /*this.cachedTextString = null;

        if (evt.isAltDown() && evt.isArrowKey()) {
            // alt with arrow keys can trigger browser forward/backward actions
            // that can just navigate away from the current world and thus
            // causing data loss. this disables it
            UserAgent.isWindows && evt.stop();
        }

        var shortCutResults = this.shortcutHandlers.invoke('invoke', evt, this);
        if (shortCutResults.include(true)) {
            evt.stop();
            return true;
        }

        if ((evt.isCommandKey() || evt.isCtrlDown()) && !(evt.isCtrlDown() && evt.isAltDown())) {
            var result = this.processCommandKeys(evt);
            if (result) evt.stop();
            // return result;
        }

        // Opera fix: evt.stop in onKeyPress does not seem to work
        evt.stopPropagation();

        var c = evt.getKeyCode();
        if (c === Event.KEY_DELETE) return this.onDelPressed(evt);
        if (c === Event.KEY_BACKSPACE) return this.onBackspacePressed(evt);
        if (c === Event.KEY_TAB) return this.onTabPressed(evt);
        if (c === Event.KEY_RETURN) return this.onEnterPressed(evt);
        if (c === Event.KEY_ESC) return this.onEscPressed(evt);
        if (c === Event.KEY_HOME) return this.onHomePressed(evt);
        if (c === Event.KEY_END) return this.onEndPressed(evt);
        if (c === Event.KEY_PAGEUP) return this.onPageUpPressed(evt);
        if (c === Event.KEY_PAGEDOWN) return this.onPageDownPressed(evt);
        if (c === Event.KEY_LEFT) return this.onLeftPressed(evt);
        if (c === Event.KEY_RIGHT) return this.onRightPressed(evt);
        if (c === Event.KEY_UP) return this.onUpPressed(evt);
        if (c === Event.KEY_DOWN) return this.onDownPressed(evt);

        return true;*/
    },
    onKeyUp: function(evt) {
        this.fit();
        evt.stop();
        return;
        // FIXME implement

        /*
        // actually it should only be necessary to null the text cache here, it should
        // be possible to remove cachedTextString = null from onKeyPress and onKeyDown
        this.cachedTextString = null

        // textString getter is expensive so only trigger when observers exist
        // Note that textString may not be changed, e.g. when pressing a control key only
        if (this.attributeConnections)
            lively.bindings.signal(this, 'textString', this.textString);

        this.fit();

        if (evt.isShiftDown())
            this.priorSelectionRange = this.getSelectionRange();

        evt.stop();
        return true;*/
    },
    onKeyPress: function(evt) {

        evt.stopPropagation;
        return true;

        // FIXME implement    
        /*this.cachedTextString = null;

        // save info for 'More' command
        this.rememberSelectionForDoMore('onKeyPress');

        var key = evt.getKeyChar();
        if (key && key.toLowerCase() == "v" && evt.isCommandKey()) {
            this.charsTyped += lively.morphic.Text.clipboardString;
        } else {
            this.charsTyped += key;
        }

        // if (this.textString.length == 0) this.textString += key;

        this.fixChunksDelayed();
        evt.stopPropagation()
        return true;*/
    },
    onPaste: function(evt) {

        evt.stop();
        return true;

/*        var htmlData = evt.clipboardData && evt.clipboardData.getData("text/html"),
            textData = evt.clipboardData && evt.clipboardData.getData("text/plain");

        if ((!htmlData && !textData) || htmlData === textData) {
            this.fixChunksDelayed();
            return false; // let HTML magic handle paste
        }

        var data = htmlData || '<span>' + textData + '</span>',  // own rich text
            richText = lively.morphic.HTMLParser.pastedHTMLToRichText(data);
        richText.replaceSelectionInMorph(this)

        evt.stop()
        return true;*/
    },
    onCut: function(evt) {
        return;
        // FIXME implement
        //this.fixChunksDelayed()
    },


    processCommandKeys: function(evt) {

        return;
        //FIXME implement

        var key = evt.getKeyChar();
        // alert("key " + key)
        if (key) key = key.toLowerCase();

        var second =  !UserAgent.isWindows && !UserAgent.isLinux
            && evt.isCtrlDown() // TODO what for windows?


        if (evt.isShiftDown()) {  // shifted commands here...
            switch (key) {
                case "i": { this.doInspect(); return true; }
                case "p": { this.doListProtocol(); return true; }
                case "f": { this.doBrowseImplementors(); return true; }
                case "b": { this.doBrowseClass(); return true; }
                case "s": { this.convertTabsToSpaces(); return true; }
                case "u": { this.unEmphasizeSelection(); return true; }
            }
        }

        switch (key) {
            case "d": { this.doDoit(); return true; } // Doit
            case "p": { this.doPrintit(); return true; } // Printit
            case "s": { this.doSave(); return true; }
            case "b": { this.toggleEmphasisForSelection('Boldness'); return true; }
            case "i": { this.toggleEmphasisForSelection('Italics'); return true; }
            case "k": { this.toggleEmphasisForSelection('Link'); return true; }
            case "o": { this.toggleEmphasisForSelection('Doit'); return true; }
            case "t": { alert("browser intercepts this t"); return true;}
            case "l": { this.toggleEmphasisForSelection('Font'); return true; }
            case "u": { this.toggleEmphasisForSelection('Underline'); return true; }


            case "1": { this.applyStyle({align: 'left'}); return true; }
            case "2": { this.applyStyle({align: 'right'});; return true; }
            case "3": { this.applyStyle({align: 'center'}); return true; }
            case "4": { this.applyStyle({align: 'justify'}); return true; }
            case "5": { this.setFontSize(8); return true; }
            case "6": { this.setFontSize(12); return true; }
            case "7": { this.setFontSize(18); return true; }
            case "8": { this.setFontSize(30); return true; }

            case "e": { this.doExchange(); return true; }
            case "f": { this.doFind(); return true; }
            case "g": { this.doFindNext(); return true; }
            case "m": { this.doMore(evt.isShiftDown()); return true; }


            case "a": {
                if (this.charsTyped && this.charsTyped.length > 0) {
                    // select recent typing, if any
                    var i = this.getSelectionRange()[1];
                    this.setSelectionRange(i - this.charsTyped.length, i);
                    this.charsTyped = '';
                    return true;
                }
                // Otherwise, do a normal select-all
                this.selectAll();
                return true;
            }
            case "x": { lively.morphic.Text.clipboardString = this.selectionString();
                return false; }
            case "c": { lively.morphic.Text.clipboardString = this.selectionString();
                return false; }
            case "v": { //  Just do the native paste
                return false; }
        }

        switch(evt.getKeyCode()) {
            // Font Size
            case 187/*cmd+'+'*/: {
                if (this.hasNullSelection())
                    this.setFontSize(this.getFontSize() + 1);
                else
                    this.increaseFontSizeOfSelection();
                return true;
            }
            case 189/*cmd+'-'*/: {
                if (this.hasNullSelection())
                    this.setFontSize(this.getFontSize() - 1);
                else
                    this.decreaseFontSizeOfSelection();
                return true;
            }

            // indent/outdent selection
            case 221/*cmd+]*/: { this.indentSelection(); return true }
            case 219/*cmd+[*/: { this.outdentSelection(); return true }

            // comment/uncoment selection
            case 191 /*cmd+/*/: { this.addOrRemoveComment(); return true }
        }

        return false;
    },
    doDoit: function() { this.evalSelection(false) },
    doPrintit: function() { this.evalSelection(true) },
    doSave: function() {

        return;
        // FIXME implement

        // resetting cachedTextString is necessary when doSave is not triggered by
        // cmd+s but from outside (e.g. from a button). The cachedTextString would not have
        // the current textString but an old one
        this.cachedTextString = null;
        this.savedTextString = this.textString;
        if (this.evalEnabled) {
            alertOK('eval')
            this.tryBoundEval(this.savedTextString)
        }
    },
    doListProtocol: function() {
        new lively.morphic.Text.ProtocolLister(this).evalSelectionAndOpenListForProtocol();
    },

    doFind: function() {
        var text = this;
        this.world() && this.world().prompt(
            "Enter the text you wish to find...",
            function(response) {
                if (!response) return;
                text.focus();
                return text.searchForFind(response, text.getSelectionRange()[1]);
            }, this.lastSearchString);
    },

    doFindNext: function() {
        if (this.lastSearchString)
        this.searchForFind(this.lastSearchString,
            // this.getSelectionRange()[0]
            this.lastFindLoc + this.lastSearchString.length
        );
    },

    doMore: function(doMuchMore) {

        return;
        // FIXME implement

        if (doMuchMore) {  // call with true (shift-M) for replace-all
            // Simplest way:  just do N replacements
            while (this.doMore(false)) { }  // Keep repeating the change while possible
            return;
        }
        // Return of true or false used by doMuchMore
        if (!this.charsReplaced || this.charsReplaced.length == 0) return false;
        this.searchForFind(this.charsReplaced, this.lastFindLoc, 'noWrap');
        if (this.selectionString() != this.charsReplaced) return false;
        var holdChars = this.charsReplaced;     // Save charsReplaced
        var holdLastFindLoc = this.lastFindLoc;
        this.insertAtCursor(this.charsTyped, true, true);
        this.charsReplaced = holdChars ;  // Restore charsReplaced after above
        this.lastFindLoc = holdLastFindLoc + this.charsTyped.length;
        return true;
    },
    doInspect: function() {
        var obj = this.evalSelection();
        if (obj) this.world().openInspectorFor(obj)
    },
    doBrowseSenders: function() {
        this.world().openBrowseSendersFor(this.getSelectionOrLineString())
    },
    doBrowseClass: function() {
        this.world().openClassBrowserFor(this.getSelectionOrLineString())
    },
    doBrowseImplementors: function() {
        this.world().openMethodFinderFor(this.getSelectionOrLineString())
    },
    rememberSelectionForDoMore: function(fromWhere) {

        return;
        // FIXME implement

        // This gets called from any typing.  It can tell what is being
        // replaced by testing for a non-zero selection.
        // At that point, it also records the location consistent with DoMore
        // and initializes charsTyped which will collect the replacement characters
        var sel = this.selectionString();

        if (!sel || sel == '') return;  // null selection means no replacement
        console.log('Text>>rememberSelectionForDoMore setting charsReplaced='+sel);
        this.charsReplaced = sel;
        this.lastFindLoc = this.getSelectionRange()[0] + sel.length;
        this.charsTyped = '';
    },
	indentSelection: function() {
        var tab = this.tab;
        this.modifySelectedLines(function(line) { return line.length == 0 ? line : tab + line });
    },
    outdentSelection: function() {
        var tab = this.tab, space = ' ';
        this.modifySelectedLines(function(line) {
                        if (line.startsWith(tab)) return line.substring(tab.length,line.length);
                        if (line.startsWith(space)) return line.substring(space.length,line.length);
            return line;
        });
    },
    doExchange: function() {
        // Probably won't preserve rich text attributes yet - DI
        var sel1 = this.getSelectionRange();
        var sel2 = this.previousSelection;

        var d = 1;    // direction current selection will move
        if (sel1[0] > sel2[0]) {var t = sel1; sel1 = sel2; sel2 = t; d = -1} // swap so sel1 is first
        if (sel1[1] > sel2[0]) return; // ranges must not overlap

        var fullText = /* (this.textStyle) ? this.getRichText() :*/ this.textString;
        var txt1 = fullText.substring(sel1[0], sel1[1]);
        var txt2 = fullText.substring(sel2[0], sel2[1]);
        var between = fullText.substring(sel1[1], sel2[0]);

        var d1 = (txt2.size() + between.size());  // amount to move sel1
        var d2 = (txt1.size() + between.size());  // amount to move sel2
        var newSel = [sel1[0]+d1, sel1[1]+d1];
        var newPrev = [sel2[0]-d2, sel2[1]-d2];
        if (d < 0) { var t = newSel;  newSel = newPrev;     newPrev = t; }
        var replacement = txt2.concat(between.concat(txt1));
        this.setSelectionRange(sel1[0], sel2[1]);     // select range including both selections
        this.insertAtCursor(replacement, true, true);    // replace by swapped text
        this.setSelectionRange(newSel[0], newSel[1]);
        this.previousSelection = newPrev;
        this.undoSelectionRange = d>0 ? sel1 : sel2;
    },
    addOrRemoveBrackets: function(bracketIndex) {
        // Not yet working - DI
        var left = this.locale.charSet.leftBrackets[bracketIndex];
        var right = this.locale.charSet.rightBrackets[bracketIndex];

        if (bracketIndex == 0) { left = "/*"; right = "*/"; }

        var i1 = this.selectionRange[0];
        var i2 = this.selectionRange[1];

        if (i1 - left.length >= 0 && this.textString.substring(i1-left.length,i1) == left &&
            i2 + right.length < this.textString.length && this.textString.substring(i2+1,i2+right.length+1) == right) {
            // selection was already in brackets -- remove them
            var before = this.textString.substring(0,i1-left.length);
            var replacement = this.textString.substring(i1,i2+1);
            var after = this.textString.substring(i2+right.length+1,this.textString.length);
            this.setTextString(before.concat(replacement,after));
            this.setSelectionRange(before.length,before.length+replacement.length);
        } else { // enclose selection in brackets
            var before = this.textString.substring(0,i1);
            var replacement = this.textString.substring(i1,i2+1);
            var after = this.textString.substring(i2+1,this.textString.length);
            this.setTextString(before.concat(left,replacement,right,after));
            this.setSelectionRange(before.length+left.length,before.length+left.length+replacement.length);
        }
    },
    addOrRemoveComment: function() {
        var commentRegex = /^(\s*)(\/\/\s*)(.*)/,
            spacesRegex = /^(\s*)(.*)/,
            noSelection = this.selectionString() == '';

        if (noSelection) this.selectCurrentLine();

        this.modifySelectedLines(function(line) {
            var commented = commentRegex.test(line);
            return (commented) ?
                line.replace(commentRegex, '$1$3') :
                line.replace(spacesRegex, '$1// $2');
        });
    },


    modifySelectedLines: function(modifyFunc) {
        // this function calls modifyFunc on each line that is selected
        // modifyFunc can somehow change the line
        // the selection grows/shrinks with the modifications
        var lines = this.selectionString().split('\n')
        for (var i = 0; i < lines.length; i++) {
            lines[i] = modifyFunc(lines[i], i);
        }
        var replacement = lines.join('\n');
        this.insertAtCursor(replacement, true, true);
    },
    splitText: function() {

        //FIXME implement
        return;

        var selRange = this.getSelectionRange(),
            from = Math.max(selRange[0], selRange[1]),
            to = this.textString.length,
            copy = this.copy();

        copy.splittedFrom = this;
        this.owner.addMorph(copy);

        // remove text that is splitted
        this.setSelectionRange(from, to);
        this.insertAtCursor('', false, true);

        // remove text in copy before splitted text
        copy.setSelectionRange(0, from);
        copy.insertAtCursor('', false, true);

        var offset = pt(0,3);
        copy.align(copy.bounds().topLeft(), this.bounds().bottomLeft().addPt(offset));
        copy.focus.bind(copy).delay(0)

        copy.fit(); // for layouting

        return copy;
    },
    mergeText: function() {
        var fromMorph = this.splittedFrom;
        while (fromMorph && !fromMorph.owner)
            fromMorph = fromMorph.splittedFrom;
        if (!fromMorph || !this.hasNullSelection() || this.getSelectionRange()[0] !== 0)
            return false;

        var rt = this.getRichText(),
            textLength = fromMorph.textString.length
        fromMorph.setSelectionRange(textLength,textLength);
        rt.replaceSelectionInMorph(fromMorph)
        this.remove();
        fromMorph.setNullSelectionAt(textLength);
        return true;
    },

},
'keyboard event reaction', {
    onEnterPressed: function(evt) {
        if (this.isInputLine) {
            this.doSave();
        } else if (evt.isCommandKey()) {
            this.splitText();
        } else {
            var range = this.getSelectionRange(),
                endIdx = Math.max(range[0], range[1]),
                length = this.textString.length;

            // when at end insert a br alement if none is there
            if (length == endIdx) {
                var chunk = this.getTextChunks().last();
                chunk.ensureEndsWithBr();
            }
            this.insertAtCursor('\n', false, true)
        }
        evt.stop();
        return true;
    },
    onEscPressed: function(evt) {
        // for removing the input cursor
        this.blur();
        evt.stop();
        return true;
    },

    onBackspacePressed: function(evt) {
        if (this.textString === '') {
            evt.stop();
            return true;
        }
        if (this.mergeText()) {
            evt.stop(); return true;
        }
        if (this.isTabBeforeCursor(true)) {
            this.insertAtCursor('', false, true)
            evt.stop();
            return true;
        }
        if (this.charsTyped.length > 0)
            this.charsTyped = this.charsTyped.substring(0, this.charsTyped.length-1);
        this.fixChunksDelayed();
        return true;
    },
    onDelPressed: function(evt) {
        if (this.isTabAfterCursor(true)) {
            this.insertAtCursor('', false, true)
            evt.stop();
            return true;
        }
        if (this.charsTyped.length > 0)
            this.charsTyped = this.charsTyped.substring(0, this.charsTyped.length-1);
        this.fixChunksDelayed();
        return true;
    },
    onTabPressed: function(evt) {
        var tab = Config.useSoftTabs ? this.tabspacesForCursorPos() : '\t';
        this.insertAtCursor(tab, false, true)
        evt.stop();
        return true;
    },
    onHomePressed: function(evt) {
        this.moveCursorToLineStart(evt.isShiftDown());
        evt.stop();
        return true;
    },
    onEndPressed: function(evt) {
        this.moveCursorToLineEnd(evt.isShiftDown());
        evt.stop();
        return true
    },
    onPageUpPressed: function(evt) {
        this.moveCursorToTextStart(evt.isShiftDown());
        evt.stop();
        return true;
    },
    onPageDownPressed: function(evt) {
        this.moveCursorToTextEnd(evt.isShiftDown());
        evt.stop();
        return true;
    },
    onLeftPressed: function($super, evt) {
        if ($super(evt)) return true;
        if (evt.isCommandKey()) {
            var isSelecting = evt.isShiftDown(),
                range = this.getSelectionRange(),
                newRange = this.selectWord(this.textString, range[0]);
            if (range[0] !== newRange[0]) {
                this.setSelectionRange(newRange[0], isSelecting ? range[1] : newRange[0]);
            } else {
                this.setSelectionRange(range[0]-1, isSelecting ? range[1] : range[0]-1);
            }
            evt.stop();
            return true
        }
        if (!evt.isAltDown()) {
            if (this.isTabBeforeCursor(true)) {
                // will create a selection of the tab/softtab
                // since we don't cancel the event the selection will also be collapsed
            }
        }
        return true;
    },
    onRightPressed: function($super, evt) {
        if ($super(evt)) return true;
        if (evt.isCommandKey()) {
            var isSelecting = evt.isShiftDown(),
                range = this.getSelectionRange(),
                newRange = this.selectWord(this.textString, range[1]);
            if (range[1] !== newRange[1]+1) {
                this.setSelectionRange(isSelecting ? range[0] : newRange[1]+1, newRange[1]+1);
            } else {
                this.setSelectionRange(isSelecting ? range[0] : range[1]+1, range[1]+1);
            }
            evt.stop();
            return true
        }
        if (!evt.isAltDown()) {
            if (this.isTabAfterCursor(true)) {
                // will create a selection of the tab/softtab
                // since we don't cancel the event the selection will also be collapsed
            }
        }
        return true;
    },
    onUpPressed: function($super, evt) { return $super(evt) || true },
    onDownPressed: function($super, evt) { return $super(evt) || true },
},
'shortcut support', {
    shortcutHandlers: [],
},
'mouse events', {
    onMouseDown: function(evt) {
        // if clicked in the text we want the default thing to happen, at least in HTML
        // but do not want other morphs to handle the event as well, so return true for was handled

        // FIXME: handled in Morph>>onMouseDown. remove.
        if (!evt.isLeftMouseButtonDown()) return false;
        if (evt.isCommandKey()) { // for halos
            //$super(evt);
            evt.stop();
            return true;
        }

        if (this.isFocused())
            this.priorSelectionRange = this.getSelectionRange();  // save for onMouseUp

        //$super(evt);

        if (!this.allowInput && !this.allowsInput) {
            evt.stop();
            return false;
        }

        // to prevent accidental scrolling to the top of the text
        // if (!this.isFocused()) evt.stop();

        // we clicked in morph but not in the text element itself
        // if (!this.getTextBounds().containsPoint(this.localize(evt.getPosition()))) {
            // this.focus();
            // evt.stop();
        // }

        return false;
    },
    onSelectStart: function($super, evt) {
        // Allow HTML selection
        return true;
    },
    onMouseUp: function(evt) {

        var a = this.getSelectionRange();
        // this happens when text has lost selection
        if (!a) return false;

        var incomingSelection = this.priorSelectionRange;

        this.charsTyped = '';

        // test if we have a null selection and same as before
        if (this.priorSelectionRange != null
            && a[0] == a[1]  // null selection
            && this.priorSelectionRange[0] == a[0]
            && this.priorSelectionRange[1] == a[1]) {
            // It is a null selection, repeated in the same place --
            // select word or range [and don't change previousSel]
            if (a[0] == 0 || a[0] == this.textString.length) {
                this.setSelectionRange(0, this.textString.length);
            } else {
                var range = this.selectWord(this.textString, a[0]);
                this.setSelectionRange(range[0], range[1]+1);
            }
        } else {
            this.previousSelection = incomingSelection;  // for 'exchange' command
        }

        this.priorSelectionRange = this.getSelectionRange();

        return false;
    },


},
'selection', {
    domSelection: function() {

        return null;

        //FIXME implement


        var sel = Global.getSelection(), node = sel.focusNode, textNode = this.renderContext().textNode;
        while(node) {
            if (textNode === node) return sel;
            node = node.parentNode;
        }
        return null;
    },

    selectionString: function() {
                
        // FIXME
        return ''

        // HTML only, works in FF & Chrome
        var sel = Global.getSelection();
        if (!sel) { return ''; }
        var range = sel.getRangeAt(0);
        if (!range) { return ''; }
        var fragment = range.cloneContents();
        if (!fragment) { return ''; }
        return fragment.textContent;
        
        // 2012-01-06 proposed generalized solution
        // aSelection.toString() replaces '\n' with ' '
        // this could be a general solution, but breaks other tests in Chrome?!
        // Problem: when typing, cursor is always BEFORE the last character in a text
        //var range = this.getSelectionRange(); // try = null and it works
        //if (!range) { return ''; }
        //var begin = (range[0] >  range[1]) ? range[1] : range[0];
        //    end   = (range[0] >= range[1]) ? range[0] : range[1];
        //var result = this.textString.substring(begin, end);
        //return result;
    },

    insertAtCursor: function(string, selectIt, overwriteSelection) {

        //FIXME implement
        return;

        this.insertElementAtCursor(NodeFactory.createText(String(string)), selectIt, overwriteSelection);
    },

    insertElementAtCursor: function(element, selectIt, overwriteSelection, replacementTextChunks) {
        //console.log('Text>>insertElementAtCursor');
        // FIXME refactor!!!

                //FIXME implement
        return;

        var node = element,
            selRange = this.getSelectionRange(),
            sel = this.domSelection(),
            range = sel.getRangeAt(0);

        if (overwriteSelection) {
            // save info for 'More' command
            this.charsReplaced = range.toString();
            this.lastFindLoc = this.getSelectionRange()[0] + element.textContent.length;
            range.deleteContents();
            var selPosAfterOverwrite = Math.min(selRange[0],selRange[1]);
            this.setSelectionRange(selPosAfterOverwrite, selPosAfterOverwrite)
        } else {
            // insert new node after current selection
            // after current selection depends on selection direction
            // either focusNode or anchorNode
            if (selRange[0] < selRange[1])
                range.setStart(sel.focusNode, sel.focusOffset);
            else
                range.setStart(sel.anchorNode, sel.anchorOffset);
        }
        range.insertNode(node);
        sel.removeAllRanges();

        range = document.createRange()

        if (selectIt) {
            range.selectNode(node)
        } else { // no real selection but set cursor, FIXME use setCursor or something
            range.setStartAfter(node)
            range.setEndAfter(node)
        }

        sel.addRange(range);

        // string has changed, removed cached version
        this.cachedTextString = null;

        // inconsistent nodes could have been added...
        this.fixChunks()
    },
    insertTextChunksAtCursor: function(newChunks, selectIt, overwriteSelection) {
        //FIXME implement
        return;
        //console.log('Text>>insertTextChunksAtCursor');
        var selRange = this.getSelectionRange();
        if (!selRange) { throw new Error("" + this + ": No selection to replace")}
        var
            start = Math.min(selRange[0],selRange[1]),
            end = Math.max(selRange[0],selRange[1]),
            chunks = this.getTextChunks(),
            oldChunks = this.sliceTextChunks(start, end),
            lastOldChunk = oldChunks.last(),
            chunkAfter = lastOldChunk && lastOldChunk.next(),
            startChunkIdx = chunks.indexOf(oldChunks[0]);

        if (overwriteSelection) {
            // save info for 'More' command
            this.charsReplaced = this.selectionString();
            this.lastFindLoc = selRange[0]; // + element.textContent.length ;
            oldChunks.invoke('remove');
        } else {
            // insert new node after current selection
            startChunkIdx += oldChunks.length - 1;
        }

        chunks.pushAllAt(newChunks, startChunkIdx);
        newChunks.invoke('addTo', this, chunkAfter);

        // string has changed, removed cached version
        this.cachedTextString = null;

        var insertionLength = newChunks.pluck('textString').pluck('length').sum();
        if (selectIt) {
            this.setSelectionRange(start, start + insertionLength)
        } else { // no real selection but set cursor, FIXME use setCursor or something
            this.setSelectionRange(start + insertionLength, start + insertionLength)
        }

        // inconsistent nodes could have been added...
        this.fixChunks()
    },

    removeTextSelection: function() {},
    getSelectionOrLineString: function() {
        //FIXME implement
        return '';

        var sel = this.domSelection(),
            range = sel.getRangeAt(0);
        if (range.collapsed)
            this.selectCurrentLine();
        return this.selectionString();
    },
    selectCurrentLine: function() {

        //FIXME implement
        return;

        var sel = this.domSelection();
        if (sel.anchorNode) {
            sel.modify('move', 'left', 'lineboundary');
            sel.modify('extend', 'right', 'lineboundary')
        }
    },
    moveCursorToLineStart: function(select) {
        this.modifySelection(select ? 'extend' : 'move', 'left', 'lineboundary');
    },
    moveCursorToLineEnd: function(select) {
        this.modifySelection(select ? 'extend' : 'move', 'right', 'lineboundary');
    },
    moveCursorToTextStart: function(select) {
        this.modifySelection(select ? 'extend' : 'move', 'left', 'documentboundary');
    },

    moveCursorToTextEnd: function(select) {
        this.modifySelection(select ? 'extend' : 'move', 'right', 'documentboundary');
    },

    modifySelection: function(extendOrMove, direction, toWhere) {
        var sel = this.domSelection();
        if (sel.anchorNode)
            sel.modify(extendOrMove, direction, toWhere);
    },




    setSelectionRange: function(start, end) {

        //FIXME implement
        return;

        if (start < 0) { start = 0; }
        if (start > this.textString.length) { start = this.textString.length; }
        if (end < 0) { end = 0; }
        if (end >= this.textString.length) { end = this.textString.length; }
        var sel = this.domSelection();
        if (!sel) sel = Global.getSelection();
        if (sel) sel.removeAllRanges();

        var startBoundaryPoint = this.getTextElementAndLocalIndexForGlobalIndex(start),
            endBoundaryPoint = this.getTextElementAndLocalIndexForGlobalIndex(end);

        // found nothing to select...
        if (startBoundaryPoint === undefined && endBoundaryPoint === undefined) return;
        if (startBoundaryPoint === undefined) startBoundaryPoint = endBoundaryPoint;
        if (endBoundaryPoint === undefined) endBoundaryPoint = startBoundaryPoint;

// alert('selecting ' + startBoundaryPoint[0].textContent + '[' + startBoundaryPoint[1] + ']-'
    // + endBoundaryPoint[0].textContent + '[' + endBoundaryPoint[1] + ']')

        if (sel.setBaseAndExtent) {
            // setBaseAndExtent supports right-to-left selections (at least in Chrome...)
            sel.setBaseAndExtent(
                startBoundaryPoint[0], startBoundaryPoint[1],
                endBoundaryPoint[0], endBoundaryPoint[1]);
        } else { // e.g. FireFox does not support setBaseAndExtent
            // actually it should not be necessary to switch the values
            // bot range does not work with right-to-left selections
            if (start > end) {
                var temp = endBoundaryPoint;
                endBoundaryPoint = startBoundaryPoint;
                startBoundaryPoint = temp;
            }
            var range = document.createRange();
            range.setStart(startBoundaryPoint[0], startBoundaryPoint[1])
            range.setEnd(endBoundaryPoint[0], endBoundaryPoint[1])
            sel.addRange(range);
        }
    },

    getSelectionRange: function() {

       //FIXME implement
        return [0,0];

        // FIXME this only works for textNodes that have the form
        // <div><span></text*></span*></div> or <div></text*></div>
        var parent = this.renderContext().textNode;
        if (!parent) return [0,0];
        var textNodeType = parent.TEXT_NODE;
        var textNodes = [];

        // collect the text nodes
        for (var i = 0; i < parent.childNodes.length; i++) {
            var child = parent.childNodes[i];
            if (child.nodeType === textNodeType) {
                textNodes.push(child)
            } else {
                for (var j = 0; j < child.childNodes.length; j++) {
                    var childchild = child.childNodes[j];
                    if (childchild.nodeType === textNodeType)
                        textNodes.push(childchild)
                }
            }
        }
        // --------

        // this function calculates how many characters are between the start of
        // the parent element and the node.
        // The node is expected to be a childNode of parent
        function nodeOffsetFrom(node) {
            if (!node) return 0;
            var offset = 0;
            for (var i = 0; i < textNodes.length; i++) {
                var nodeBefore = textNodes[i];
                if ((node.compareDocumentPosition(nodeBefore) & node.DOCUMENT_POSITION_PRECEDING) != 0) {
                    offset += nodeBefore.textContent.length;
                }
            }
            return offset;
        }
        var sel = this.domSelection();
        if (!sel) return null;

        // anchor is the start node, focusNode is the end node of the selection
        // see https://developer.mozilla.org/en/DOM/Selection

        // there is a problem with the above algorithm when calling getSelectionRange
        // when the caret is at the end of the text. In this case anchorNode and focusNode
        // are not textNodes and nodeOffsetFrom() would not return anything meaningful
        // Since anchorNode.childNodes[anchorOffset] and focusNode.childNodes[focusOffset]
        // identify the node from/to selection was exist, use this node for calculation
        // In this case return the text length as indexes of the range
        var anchorIsText = sel.anchorNode.nodeType == textNodeType;
        var anchorNode = anchorIsText ? sel.anchorNode : sel.anchorNode.childNodes[sel.anchorOffset];
        var anchorOffset = anchorIsText ? sel.anchorOffset : 0;

        var focusIsText = sel.focusNode.nodeType == textNodeType;
        var fixedFocusOffset = sel.focusOffset;//!focusIsText && (sel.focusOffset >= sel.focusNode.childNodes.length) ? (sel.focusNode.childNodes.length - 1) : sel.focusOffset;
        var focusNode = focusIsText ? sel.focusNode : sel.focusNode.childNodes[fixedFocusOffset];
        var focusOffset = focusIsText ? sel.focusOffset : 0;

        var result = [nodeOffsetFrom(anchorNode) + anchorOffset,
                      nodeOffsetFrom(focusNode) + focusOffset];

        //if (focusNode == textNodes[textNodes.length - 1] && focusOffset == focusNode.textContent.length) {
          //  console.log('Text>>getSelectionRange: cursor at end, returning [' + result[0] + ',' + result[1] + ']');
            //result.push(true);
            //result.push(textNodes[textNodes.length - 1]);
        //}

        return result;
    },


    selectAll: function() {
        if (this.textString.length > 0)
            this.setSelectionRange(0, this.textString.length);
        else
            this.focus();
    },
    hasNullSelection: function() {
        var range = this.getSelectionRange();
        return range && range[0] === range[1]
    },

    setNullSelectionAt: function(idx) { this.setSelectionRange(idx, idx) },
    getSelectionBounds: function() {
        var r = this.getGlobalSelectionBounds(),
            world = this.world(),
            transformed = world ? world.transformToMorph(this).transformRectToRect(r):r;
        return transformed;
    },
    getGlobalSelectionBounds: function() {
        var sel = this.domSelection();
        if (!sel) return new Rectangle(0,0,0,0);
        var range = sel.getRangeAt(0);
        if (!range) return new Rectangle(0,0,0,0);
        // FIXME HTML specific
        var domR = range.getBoundingClientRect();
        if (!domR) return new Rectangle(0,0,0,0);
        var s = this.getAccumulatedScroll(),
            r = new Rectangle(domR.left+s[0], domR.top+s[1], domR.width, domR.height);
        return r;
    },

    selectWord: function(str, i1) { // Selection caret before char i1
        // Most of the logic here is devoted to selecting matching backets

        //FIXME implement
        return;


        var rightBrackets = "*)}]>'\"";
        var leftBrackets = "*({[<'\"";
        function isWhiteSpace(c) { return c === '\t' || c === ' '; }
        function isAlpha(s) {
            var regEx = /^[a-zA-Z0-9\-]+$/;
            return s.match(regEx);
        };
        function periodWithDigit(c, prev) {
            // return true iff c is a period and prev is a digit
            if (c != ".") return false;
            return "0123456789".indexOf(prev) >= 0;
        };

        var i2 = i1 - 1;
        if (i1 > 0) { // look left for open backets
            if(str[i1-1] == "\n" || str[i1-1] == "\r") return this.findLine(str, i1, 1, str[i1-1]);
            var i = leftBrackets.indexOf(str[i1-1]);
            if (str[i1 - 1] == "*" && (i1-2 < 0 || str[i1-2] != "/"))
            i = -1; // spl check for /*
            if (i >= 0) {
                var i2 = this.matchBrackets(str, leftBrackets[i], rightBrackets[i], i1 - 1, 1);
                return [i1, i2 - 1];
            }
        }
        if (i1 < str.length) { // look right for close brackets
            if(str[i1] == "\n" || str[i1] == "\r") return this.findLine(str, i1, -1, str[i1]);
            var i = rightBrackets.indexOf(str[i1]);
            if (str[i1]== "*" && (i1+1 >= str.length || str[i1+1] != "/"))
            i = -1; // spl check for */
            if (i >= 0) {
                i1 = this.matchBrackets(str, rightBrackets[i], leftBrackets[i],i1,-1);
                return [i1+1, i2];
            }
        }

        // is a '//' left of me?
        if (str[i1-1] === '/' && str[i1-2] === '/') {
            while (i2+1<str.length && str[i2+1] !== '\n' && str[i2+1] !== '\r') { i2++ }
            return [i1, i2];
        }

        // inside of whitespaces?
        var myI1 = i1;
        var myI2 = i2;
        while (myI1-1 >= 0 && isWhiteSpace(str[myI1-1])) myI1 --;
        while (myI2 < str.length && isWhiteSpace(str[myI2+1])) myI2 ++;
        if (myI2-myI1 >= 1) return [myI1, myI2];

        var prev = (i1<str.length) ? str[i1] : "";
        while (i1-1 >= 0 && (isAlpha(str[i1-1]) || periodWithDigit(str[i1-1], prev))) {
            prev = str[i1-1];
            i1--;
        }
        while (i2+1 < str.length && (isAlpha(str[i2+1]) || periodWithDigit(str[i2+1], prev))) {
            prev = str[i2+1];
            i2++;
        }
        return [i1, i2];
    },
    matchBrackets: function(str, chin, chout, start, dir) {
        var i = start;
        var depth = 1;
        while ((dir < 0) ? i - 1 >= 0 : i + 1 < str.length ) {
            i += dir;
            if (str[i] == chin && chin != chout) depth++;
            if (str[i] == chout) depth--;
            if (depth == 0) return i;
        }
        return i;
    },
    findLine: function(str, start, dir, endChar) { // start points to a CR or LF (== endChar)
        var i = start;
        while ((dir < 0) ? i - 1 >= 0 : i + 1 < str.length ) {
            i += dir;
            if (str[i] == endChar) return dir>0 ? [start, i] : [i+1, start];
        }
        return dir>0 ? [start+1, str.length-1] : [0, start];
    },

},
'scrolling', {
    basicGetScrollableNode: function(evt) {
        // for ScrollableTrait

        //FIXME implement
        return;

        //return this.renderContext().shapeNode
    },
    scrollSelectionIntoView: function() {

        //FIXME implement
        return;    
        this.scrollRectIntoView(this.getSelectionBounds(), true)
    },
},
'evaluation', {
    evalSelection: function(printIt) {
        var str = this.getSelectionOrLineString(),
            result = this.tryBoundEval(str);
        if (printIt) this.insertAtCursor(String(result), true);
        return result;
    },
    evalAll: function() {
        var str = this.textString,
            result = this.tryBoundEval(str);
        return result;
    },

    boundEval: function (str) {
        // Evaluate the string argument in a context in which "this" may be supplied by the modelPlug
        var ctx = this.getDoitContext() || this,
            interactiveEval = function(text) { return eval(text) };
        return interactiveEval.call(ctx, str);
    },
    tryBoundEval: function(str) {
        try { return this.boundEval(str) } catch(e) { this.showError(e) }
    },

    getDoitContext: function() { return this.doitContext },
},
'testing', {
    hasUnsavedChanges: function() {
        return false;
        // return this.savedTextString !== this.textString;
    },
    isFocused: function() { return lively.morphic.Text.activeInstance() === this },

},
'searching', {
    searchForFind: function(str, start, noWrap) {
        // if (this.world()) this.focus();
        var i1 = this.textString.indexOf(str, start);
        if (i1 < 0 && !noWrap) i1 = this.textString.indexOf(str, 0); // wrap
        if (i1 >= 0) this.setSelectionRange(i1, i1+str.length);
        else this.setNullSelectionAt(0);
        this.scrollSelectionIntoView();
        this.lastSearchString = str;
        this.lastFindLoc = i1;
    },
},
'debugging', {
    showError: function (e, offset) {

        offset = offset || 0;
        var msg = "" + e + "\n" +
            "Line: " + e.line + "\n" +
            (e.sourceURL ? ("URL: " + (new URL(e.sourceURL).filename()) + "\n") : "");
        if (e.stack) {
            // make the stack fit into status window
            msg += e.stack.replace(new RegExp(URL.codeBase.toString(), "g"),"");
        }

        var world = lively.morphic.World.current();
        if (!world) {
            console.log("Error in " +this.id() + " bound eval: \n" + msg)
            return
        };

        if (e.expressionEndOffset) {
            this.setSelectionRange(e.expressionBeginOffset + offset, e.expressionEndOffset + offset);
        }
        else if (e.line) {
            alert("Error " + e + "on line " + e.line + " offset " + offset)
        }
        if (world)
            world.logError(e)
    },
    textNodeString: function() {

        //FIXME implement
        return '';

        var textNode = this.renderContext().textNode;
        if (!textNode) return 'textNode not yet accessible';
        var isolatedTextNode = textNode.cloneNode(false/*no children*/)
        var string = Exporter.stringify(isolatedTextNode);
        var midIdx = string.indexOf('</div>');
        var childrenString = $A(textNode.childNodes).collect(function(ea) { return '    ' + Exporter.stringify(ea) }).join('\n');
        string = string.slice(0, midIdx) + '\n' + childrenString + '\n' + string.slice(midIdx)
        return string;
this. textNodeString()
    },

},
'experimentation', {
    setWhiteSpaceHandling: function(modeString) {
        return this.morphicSetter('WhiteSpaceHandling', modeString);
    },
    getWhiteSpaceHandling: function(modeString) {
        return this.morphicGetter('WhiteSpaceHandling') || 'pre-wrap';
    },
    getTextElements: function() {
        // returns js objects for subnodes of this.renderContext().textNode
        // they have the following properties:
        // node: the text node,
        // startIndex: the (global)startIndex of the node in the whole text,
        // endIndex: global end index
        // method toString for debugging

        //FIXME implement
        return '';

        var textNodeType = this.renderContext().textNode.TEXT_NODE;
        function isTextNode(node) { return node && node.nodeType == textNodeType }
        function flattenTextNodes(node) {
            if (!node) return [];
            if (isTextNode(node)) return [node];
            var result = [];
            for (var i = 0; i < node.childNodes.length; i++)
                result = result.concat(flattenTextNodes(node.childNodes[i]))
            return result;
        }


//var endlessProtection = 0;
//endlessProtection++
//if (endlessProtection > 10000) throw new Error('Endless loop in getTextElements!')

        var nodes = flattenTextNodes(this.renderContext().textNode),
            result = [],
            index = 0;

        for (var i = 0; i < nodes.length; i++) {
            var part = nodes[i];
            if (!part.textContent) continue;
            var start = index,
                length = part.textContent.length,
                end = start + length;
            index = end;
            result.push({
                node: part,
                startIndex: start,
                endIndex: end,
                toString: function() {
                    return '<' + this.node.textContent.replace(/\n/, '\\n') + '>: ' + this.startIndex + '-' + this.endIndex;
                }})
        }
        return result;
    },

    getTextElementAndLocalIndexForGlobalIndex: function(idx) {
        // returns a subnode and the index in the subnode that responds to the global index
        // of the whole text
        // the index used for lookup is sanitized
        // example: subnodes: <text>foo</text><text>bar</text>, idx: 5
        // would return [<text>bar</text>, 2] (local idx between a and r)

        //FIXME implement
        return;

        idx = Math.max(0, Math.min(idx, this.textString.length));
        var textParts = this.getTextElements();
        for (var i = 0; i < textParts.length; i++) {
            if (idx >= textParts[i]. startIndex && idx <= textParts[i].endIndex) {
                var node = textParts[i].node,
                    localIdx = idx - textParts[i].startIndex;
                return [node, localIdx]
            }
        }
        return [this.renderContext().textNode, 0];
    },
    setRichText: function(richText) {
        richText.applyToTextMorph(this);
        return richText;
    },
    getRichText: function() {
        var rt = new lively.morphic.RichText(this.textString);
        rt.setTextChunks(this.getTextChunks());
        return rt;
    },
    getRichTextFromTo: function(from, to) {
        var string = this.textString.slice(from, to),
            rt = new lively.morphic.RichText(string);
        rt.setTextChunks(this.sliceTextChunks(from, to));
        return rt;
    },


    getTextStyle: function() {
        alert('getTextStyle not yet implemented'); return;
        // if (!this.textStyle)
            // this.textStyle = new lively.RunArray([this.textString.length], [new lively.TextEmphasis({})]);
        // return this.textStyle;
    },
    getRange: function(from, to) {
        var range = document.createRange(),
            startNodeAndIdx = this.getTextElementAndLocalIndexForGlobalIndex(from),
            endNodeAndIdx = this.getTextElementAndLocalIndexForGlobalIndex(to);
        range.setStart(startNodeAndIdx[0], startNodeAndIdx[1]);
        range.setEnd(endNodeAndIdx[0], endNodeAndIdx[1]);
        return range
    },
    getSelectionBounds: function() {
        // returns bounds of selection in world coordinates
        var r = this.domSelection().getRangeAt(0).getBoundingClientRect()
        var s = 1 / this.world().getScale();

        r = rect(pt(s * r.left , s * r.top), pt(s * r.right, s * r.bottom));
        return r.translatedBy($world.visibleBounds().topLeft());
    },

},
'rich text', {
    emphasize: function(styleSpec, from, to) {
        var chunks = this.sliceTextChunks(from, to);
        for (var i = 0; i < chunks.length; i++)
            chunks[i].styleText(styleSpec);
        this.coalesceChunks();
    },
    unEmphasize: function(from, to) {
        var chunks = this.sliceTextChunks(from, to);
        for (var i = 0; i < chunks.length; i++) {
            chunks[i].styleText({isNullStyle: true})
            chunks[i].style = new lively.morphic.TextEmphasis();
        }
        this.coalesceChunks();
    },
    unEmphasizeSelection: function() {
        var range = this.getSelectionRange();
        this.unEmphasize(range[0], range[1]);
        this.setSelectionRange(range[0], range[1]);
    },
    unEmphasizeAll: function() {
        this.unEmphasize(0, this.textString.length)
    },

    emphasizeAll: function(style) {
        this.emphasize(style, 0, this.textString.length);
    },
    emphasizeRegex: function(re, style) {
        var m, counter = 0, string = this.textString;
        while(m = re.exec(string)) {
            counter++; if (counter > 5000) throw new Error('emphasizeRegex endless loop?');
            var from = m.index, to = m.index + m[0].length;
            var chunks = this.sliceTextChunks(from, to);
            for (var i = 0; i < chunks.length; i++)
                //chunks[i].style.add(style); //
                chunks[i].styleText(style);
        }
        this.coalesceChunks();
    },

    changeEmphasis: function(from, to, callback) {
        // callback is called with the first emphasis that is found in the range from-to
        // callback should return a new emphasis
        var emph = this.getEmphasisAt(from);
        if (!emph) return;
        callback(emph, function doEmph(newEmph) {
            this.emphasize(newEmph, from, to);
            this.setSelectionRange(from, to);
        }.bind(this));
    },
    toggleItalics: function(from, to) {
        this.changeEmphasis(from, to, function(emph, doEmph) {
            doEmph({italics: emph.getItalics() === 'italic' ? 'normal' : 'italic'})
        })
    },


    toggleBoldness: function(from, to) {
        this.changeEmphasis(from, to, function(emph, doEmph) {
            doEmph({fontWeight: emph.getFontWeight() === 'bold' ? 'normal' : 'bold'})
        })
    },
    toggleUnderline: function(from, to) {
        this.changeEmphasis(from, to, function(emph, doEmph) {
            doEmph({textDecoration: emph.getTextDecoration() === 'underline' ? 'normal' : 'underline'})
        })
    },

    toggleLink: function(from, to) {
        var world = this.world()
        this.changeEmphasis(from, to, function(emph, doEmph) {
            world.prompt('Enter link URL', function(input) {
                 if (input === null) {
                    alertOK("canceled edit link")
                    return;
                }
                if (input == '') input = null;
                doEmph({uri: input})
            }, emph.uri);
        })
    },
    toggleDoit: function(from, to) {
        var world = this.world(), text = this;
        this.changeEmphasis(from, to, function(emph, doEmph) {
            world.editPrompt('Enter doit code', function(input) {
                if (input === null) {
                    alertOK("canceled edit doit")
                    return;
                }
                if (input == '') input = null;
                doEmph({doit: input ? {code: input, context: null} : null})
            }, emph.doit && emph.doit.code);
        })
    },
    toggleFont: function(from, to) {
        var world = this.world(), text = this;
        this.changeEmphasis(from, to, function(emph, doEmph) {
        // this.priorSelectionRange = this.getSelectionRange();
            var fontChooser = $morph('TextAttributePanel');
            if (!fontChooser) {
                fontChooser = lively.PartsBin.getPart('TextAttributePanel', 'PartsBin/Tools');
                world.addMorph(fontChooser);
                fontChooser.align(fontChooser.bounds().topLeft().addPt(pt(-30,-30)),
                     world.firstHand().getPosition());

            }
            fontChooser.selectTextMorph(text)
        })
    },




    toggleEmphasisForSelection: function(emphAttributeType) {
        // emphAttributeType can be Boldness, ...
        try {
            var selRange = this.getSelectionRange(),
                emphRange = this.convertSelectionRangeForEmphasis(selRange);
            this['toggle' + emphAttributeType](emphRange[0], emphRange[1]);
            // this.setSelectionRange(selRange[0], selRange[1]);
        } catch(e) {
            alert('Error when doing  toggle' + emphAttributeType + ': ' + e);
            debugger;
        }
    },
    emphasizeSelection: function(emphSpec) {
        // emphAttributeType can be Boldness, ...
        try {
            var selRange = this.getSelectionRange(),
                emphRange = this.convertSelectionRangeForEmphasis(selRange);
            this.emphasize(emphSpec, emphRange[0], emphRange[1]);
            this.setSelectionRange(selRange[0], selRange[1]);
        } catch(e) {
            alert('Error when doing  emphasizing' + JSON.stringify(emphSpec) + ': ' + e);
            debugger;
        }
    },


    convertSelectionRangeForEmphasis: function(selRange) {
        var from = selRange[0], to = selRange[1];
        return from > to ? [to, from] : [from, to];
    },
    increaseFontSizeOfSelection: function() {
        this.setFontSizeOfSelectionDo(function(oldSize) { return oldSize + 1});
    },
    decreaseFontSizeOfSelection: function() {
        this.setFontSizeOfSelectionDo(function(oldSize) { return oldSize - 1});
    },

    setFontSizeOfSelectionDo: function(callback) {
        var range = this.getSelectionRange(),
            from = range[0], to = range[1],
            fontSize = this.getFontSize();
        this.changeEmphasis(from, to, function(emph, doEmph) {
            doEmph({fontSize: callback((emph.getFontSize() || fontSize))})
        })
    },


    getEmphasisAt: function(idx) {
        var chunkAndIdx = this.getChunkAndLocalIndex(idx, true);
        return chunkAndIdx && chunkAndIdx[0].style;
    },

},
'status messages', {
    setStatusMessage: function(msg, color, delay) {
        console.log("status: " + msg)
        if (!this._statusMorph) {
            this._statusMorph = new lively.morphic.Text(pt(400,80).extentAsRectangle());
            this._statusMorph.applyStyle({borderWidth: 0, strokeOpacity: 0, fill: Color.gray, fontSize: 16, fillOpacity: 1, fixedWidth: false, fixedHeight: false})
            this._statusMorph.isEpiMorph = true;
        }
        var statusMorph = this._statusMorph;
        statusMorph.textString = msg;
        this.world().addMorph(statusMorph);
        statusMorph.setTextColor(color || Color.black);


        this._statusMorph.fit.bind(this._statusMorph).delay(0);
        statusMorph.ignoreEvents();
        // FIXME getSelectionBounds does not work yet when there is a null selection
        if (this.isFocused()) {
            // seems to be broken
            // var bounds = this.getGlobalSelectionBounds(),
            //     pos = bounds ? bounds.bottomLeft() : pt(0, 20),
            //      pos = pos; //this.owner.worldPoint(pos);
            // statusMorph.setPosition(pos);

            statusMorph.align(statusMorph.bounds().topLeft(),
                this.worldPoint(this.innerBounds().bottomLeft()))
        } else {
            statusMorph.centerAt(this.worldPoint(this.innerBounds().center()));
        };
        (function() { statusMorph.remove() }).delay(delay || 4);
    },
},
'tab handling', {
    tab: Config.useSoftTabs ? '    ' : '\t',
    isTabBeforeCursor: function(selectIt) { return this.isTabBeforeOrAfterCursor(selectIt, false) },
    isTabAfterCursor: function(selectIt) { return this.isTabBeforeOrAfterCursor(selectIt, true) },
    isTabBeforeOrAfterCursor: function(selectIt, after) {
        if (!this.hasNullSelection()) return;
        var selRange = this.getSelectionRange(),
            rangeToTest = selRange.clone();
        if (after) rangeToTest[1] = rangeToTest[1]+this.tab.length;
        else rangeToTest[0] = rangeToTest[0]-this.tab.length;
        this.setSelectionRange(rangeToTest[0], rangeToTest[1]);
        var isTab = this.selectionString() === this.tab;
        if (!isTab || !selectIt)
                this.setSelectionRange(selRange[0], selRange[1]);
        return isTab;
    },

    convertTabsToSpaces: function() {
        var tabRegex = /\t/g,
            tab = this.tab,
            noSelection = this.selectionString() == '';

        if (noSelection) this.selectCurrentLine();

        this.modifySelectedLines(function(line) { return line.replace(tabRegex, tab) });
    },

    tabspacesForCursorPos: function() {
        var cursorPos = this.getSelectionRange()[0]
        if (this.textString[cursorPos] == '\n') return this.tab
        var beginOfLine = this.textString.lastIndexOf("\n", cursorPos);
        var column = this.textString.substring(beginOfLine + 1, cursorPos);
        // alertOK("tab " + column.length)
        return  Strings.indent("", " ", this.tab.length - column.length % this.tab.length )
    },
},
'syntax highlighting', {
    highlightJavaScriptSyntax: function() {
        // can be overwritten
    },
    enableSyntaxHighlighting: function() {
        var text = this;
        require('lively.ide.SyntaxHighlighting').toRun(function() {
            text.syntaxHighlightingWhileTyping = true;
            connect(text, 'textString', text, 'highlightJavaScriptSyntax');
            text.highlightJavaScriptSyntax()
        })
    },
    disableSyntaxHighlighting: function() {
        this.syntaxHighlightingWhileTyping = false;
        disconnect(this, 'textString', this, 'highlightJavaScriptSyntax');
    },

    enableSyntaxHighlightingOnSave: function() {
        var text = this;
        require('lively.ide.SyntaxHighlighting').toRun(function() {
            text.syntaxHighlightingOnSave = true;
            connect(text, 'savedTextString', text, 'highlightJavaScriptSyntax');
        });
    },
    disableSyntaxHighlightingOnSave: function() {
        this.syntaxHighlightingOnSave = false;
        disconnect(this, 'savedTextString', this, 'highlightJavaScriptSyntax');
    },



});


Object.extend(lively.morphic.NewText, {
    activeInstance: function() {
        // returns the text that currently has a focus
        // set in onFocus and onBlur
        return this.prototype.activeInstance;
    },
});
Object.subclass('lively.LeanText',
/*
 * lively.LeanText: How to build an in-place WYSIWIG (Rich)Text Editor
 * that can also be use from outside Lively.
 * This Text implementation heavily relies on jQuery and thus HTML
 */

'default category', {
    initialize: function(parentNode) {
        this.serializedString = '';
        this.parentNode = parentNode;
        this.textNode = null;
        this.createTextNode();
        this.padding = 2;
    },
    recreateOn: function(parentNode) {
        this.parentNode = parentNode;
        this.textNode = this.createTextNode();
    },


    createTextNode: function() {
        this.textNode = $('<div>' + this.serializedString + '</div>');
        this.textNode.attr('contenteditable', 'true');
        this.textNode.attr('width', '100%');
        this.textNode.attr('height', '100%');
        this.textNode.css('padding', this.padding + 'px');
        this.textNode.css('white-space', 'pre-wrap');
        this.textNode.css('word-wrap', 'break-word');
            // variable width: 'pre', 'normal'
        $(this.parentNode).append(this.textNode);
        return this.textNode;
    },
    getWidth: function() {
        return $(this.textNode).width() + 2 * this.padding;
    },
    getHeight: function() {
        return $(this.textNode).height() + 2 * this.padding;
    },
    getTextExtent: function() {
        return pt(this.getWidth(), this.getHeight());
    },

    getText: function() {
        return $(this.textNode).text();
    },
    setText: function(aString) {
        $(this.textNode).text(aString);
    },
    getTextNode: function() {
        return this.textNode;
    },

});

lively.morphic.NewText.addMethods(
'serialization', {
    doNotSerialize: ['charsTyped'],
    onstore: function($super) {
        $super();
        this.leanText.serializedString = this.textString;
        return;
    },
    onrestore: function($super) {
        $super();
    },
    prepareForNewRenderContext: function($super,renderCtx) {
        $super(renderCtx);
        if (this.serializedString) {
            this.textString = this.serializedString;
            return;
        }
    },

});


lively.morphic.NewText.addMethods(
'HTML render settings', {
    htmlDispatchTable: {
        updateText: 'updateTextHTML',
        setTextExtent: 'setTextExtentHTML',
        setMaxTextWidth: 'setMaxTextWidthHTML',
        setMaxTextHeight: 'setMaxTextHeightHTML',
        setMinTextWidth: 'setMinTextWidthHTML',
        setMinTextHeight: 'setMinTextHeightHTML',
        getTextExtent: 'getTextExtentHTML',
        getTextString: 'getTextStringHTML',
        ignoreTextEvents: 'ignoreTextEventsHTML',
        unignoreTextEvents: 'unignoreTextEventsHTML',
        enableTextEvents: 'enableTextEventsHTML',
        setFontFamily: 'setFontFamilyHTML',
        setFontSize: 'setFontSizeHTML',
        setTextColor: 'setTextColorHTML',
        setPadding: 'setPaddingHTML',
        setAlign: 'setAlignHTML',
        setVerticalAlign: 'setVerticalAlignHTML',
        setDisplay: 'setDisplayHTML',
        setWhiteSpaceHandling: 'setWhiteSpaceHandlingHTML',
        focusMorph: 'focusMorphHTML'
    },
},
'rendering', {
    initHTML: function($super, ctx) {

        $super(ctx);
        //FIXME implement


        return;

        if (!ctx.textNode) ctx.textNode = this.createTextNodeHTML();
        

        this.setFontSizeHTML(ctx, this.getFontSize());
        this.setFontFamilyHTML(ctx, this.getFontFamily());
        this.setAlignHTML(ctx, this.getAlign());
        this.setVerticalAlignHTML(ctx, this.getVerticalAlign());
        this.setDisplayHTML(ctx, this.getDisplay());
        this.setTextColorHTML(ctx, this.getTextColor());
        this.setWhiteSpaceHandlingHTML(ctx, this.getWhiteSpaceHandling());
        this.fit();
        if (this.textChunks)
            this.textChunks.forEach(function(chunk) { chunk.addTo(this) }, this)
        else
            this.updateTextHTML(ctx, this.textString);
    },
    appendHTML: function($super, ctx, optMorphAfter) {
        $super(ctx, optMorphAfter);
        this.appendTextHTML(ctx);
        this.fit();
    },
    appendTextHTML: function(ctx) {
        //FIXME needed?
        return

        if (!ctx.morphNode) throw dbgOn(new Error('appendText: no morphNode!'))
        if (!ctx.shapeNode) throw dbgOn(new Error('appendText: no shapeNode!'))
        if (!ctx.textNode) throw dbgOn(new Error('appendText: no textNode!'))
        ctx.shapeNode.appendChild(ctx.textNode);
    },
    updateTextHTML: function(ctx, string) {
        this.firstTextChunk().textString = string;
    },
},
'accessing', {
    getTextExtentHTML: function(ctx) {
        if (!ctx.textNode) return pt(0,0);
        return ctx.textNode.scrollHeight != 0 ?
            pt(ctx.textNode.scrollWidth, ctx.textNode.scrollHeight) : this.getExtent();
    },
    setTextExtentHTML: function(ctx, value) {
        if (ctx.textNode)
            ctx.domInterface.setExtent(ctx.textNode, value);
    },

    setMaxTextWidthHTML: function(ctx, value) {
        if (ctx.textNode)
            ctx.domInterface.setMaxWidth(ctx.textNode, value);
    },
    setMaxTextHeightHTML: function(ctx, value) {
        if (ctx.textNode)
            ctx.domInterface.setMaxHeight(ctx.textNode, value);
    },
    setMinTextHeightHTML: function(ctx, value) {
        if (ctx.textNode)
            ctx.domInterface.setMinHeight(ctx.textNode, value);
    },
    setMinTextWidthHTML: function(ctx, value) {
        if (ctx.textNode)
            ctx.domInterface.setMinWidth(ctx.textNode, value);
    },
    getTextStringHTML: function(ctx) { return ctx.textNode ? ctx.textNode.textContent : '' },
    setFontSizeHTML: function(ctx, size) {
        if (ctx.textNode)
            ctx.textNode.style.fontSize = size + 'pt'
    },
    setFontFamilyHTML: function(ctx, fontName) {
        if (ctx.textNode)
            ctx.textNode.style.fontFamily = fontName
    },
    setTextColorHTML: function(ctx, color) {
        if (ctx.textNode) {
            if (color && color.toCSSString) color = color.toCSSString();
            ctx.textNode.style.color = color
        }
    },
    setPaddingHTML: function(ctx, r) {
        // TODO Deprecated, to be removed
        console.warn('lively.morphic.Text>>setPaddingHTML should not be called anymore!!!')
    },
    setAlignHTML: function(ctx, alignMode) {
        if (!ctx.textNode) return;
        ctx.textNode.style.textAlign = alignMode;
        this.setWhiteSpaceHandling(alignMode === 'justify' ? 'pre-line' : 'pre-wrap');
    },
    setVerticalAlignHTML: function(ctx, valignMode) {
        if (ctx.textNode)
            ctx.textNode.style.verticalAlign = valignMode;
    },
    setDisplayHTML: function(ctx, mode) {
        if (ctx.textNode)
            ctx.textNode.style.display = mode;
    },
    setWhiteSpaceHandlingHTML: function(ctx, modeString) {
        if (ctx.textNode)
            ctx.textNode.style.whiteSpace = modeString || 'normal';
    },
    getWhiteSpaceHandlingHTML: function(ctx) {
        return ctx.textNode ? (ctx.textNode.style.whiteSpace || 'normal') : 'normal';
    },
},
'event management', {
    ignoreTextEventsHTML: function(ctx) {
        if (ctx.textNode)
            ctx.textNode.contentEditable = false;
    },
    unignoreTextEventsHTML: function(ctx) {
        if (ctx.textNode)
            ctx.textNode.contentEditable = true;
    },

    enableTextEventsHTML: function(ctx) {
        if (ctx.textNode)
            ctx.textNode.contentEditable = true;
    },
    focusHTML: function(ctx) {
        var node = ctx.textNode;
        if (node && !this.isFocused() && node.tabIndex !== undefined) node.focus();
    },
    focusMorphHTML: function(ctx) {
        var node = ctx.morphNode;
        if (node && !this.isFocused() && node.tabIndex !== undefined) node.focus();
    },
    blurHTML: function(ctx) {
        var node = ctx.textNode;
        if (node && this.isFocused()) node.blur();
    },
},
'node creation', {
    createTextNodeHTML: function() {

        //this.leanText = new lively.LeanText(this.renderContext().shapeNode);
        //return this.leanText.getTextNode();
        
        var node = XHTMLNS.create('div');
        node.contentEditable = true;
        node.className = 'visibleSelection';
        node.style.cssText = 'position: absolute;' + // needed for text extent calculation
                             'word-wrap: break-word;';
        return node;
    },
    prepareForNewRenderContext: function($super, newCtx) {
        $super(newCtx);
        if (!this.leanText) {
            this.leanText = new lively.LeanText(newCtx.shapeNode);
        } else {
            this.leanText.recreateOn(newCtx.shapeNode);
        }
    },

});


}) // end of module