/* */ 
"format cjs";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/core';
import { ListWrapper } from 'angular2/src/facade/collection';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { isPresent, isString, RegExpWrapper, StringWrapper } from 'angular2/src/facade/lang';
export let Log = class {
    constructor() {
        this._result = [];
    }
    add(value) { this._result.push(value); }
    fn(value) {
        return (a1 = null, a2 = null, a3 = null, a4 = null, a5 = null) => { this._result.push(value); };
    }
    clear() { this._result = []; }
    result() { return this._result.join("; "); }
};
Log = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], Log);
export var browserDetection = null;
export class BrowserDetection {
    constructor(ua) {
        if (isPresent(ua)) {
            this._ua = ua;
        }
        else {
            this._ua = isPresent(DOM) ? DOM.getUserAgent() : '';
        }
    }
    static setup() { browserDetection = new BrowserDetection(null); }
    get isFirefox() { return this._ua.indexOf('Firefox') > -1; }
    get isAndroid() {
        return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
            this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1;
    }
    get isEdge() { return this._ua.indexOf('Edge') > -1; }
    get isIE() { return this._ua.indexOf('Trident') > -1; }
    get isWebkit() {
        return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1;
    }
    get isIOS7() {
        return this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1;
    }
    get isSlow() { return this.isAndroid || this.isIE || this.isIOS7; }
    // The Intl API is only properly supported in recent Chrome and Opera.
    // Note: Edge is disguised as Chrome 42, so checking the "Edge" part is needed,
    // see https://msdn.microsoft.com/en-us/library/hh869301(v=vs.85).aspx
    get supportsIntlApi() {
        return this._ua.indexOf('Chrome/4') > -1 && this._ua.indexOf('Edge') == -1;
    }
}
export function dispatchEvent(element, eventType) {
    DOM.dispatchEvent(element, DOM.createEvent(eventType));
}
export function el(html) {
    return DOM.firstChild(DOM.content(DOM.createTemplate(html)));
}
var _RE_SPECIAL_CHARS = ['-', '[', ']', '/', '{', '}', '\\', '(', ')', '*', '+', '?', '.', '^', '$', '|'];
var _ESCAPE_RE = RegExpWrapper.create(`[\\${_RE_SPECIAL_CHARS.join('\\')}]`);
export function containsRegexp(input) {
    return RegExpWrapper.create(StringWrapper.replaceAllMapped(input, _ESCAPE_RE, (match) => `\\${match[0]}`));
}
export function normalizeCSS(css) {
    css = StringWrapper.replaceAll(css, /\s+/g, ' ');
    css = StringWrapper.replaceAll(css, /:\s/g, ':');
    css = StringWrapper.replaceAll(css, /'/g, '"');
    css = StringWrapper.replaceAll(css, / }/g, '}');
    css = StringWrapper.replaceAllMapped(css, /url\((\"|\s)(.+)(\"|\s)\)(\s*)/g, (match) => `url("${match[2]}")`);
    css = StringWrapper.replaceAllMapped(css, /\[(.+)=([^"\]]+)\]/g, (match) => `[${match[1]}="${match[2]}"]`);
    return css;
}
var _singleTagWhitelist = ['br', 'hr', 'input'];
export function stringifyElement(el) {
    var result = '';
    if (DOM.isElementNode(el)) {
        var tagName = DOM.tagName(el).toLowerCase();
        // Opening tag
        result += `<${tagName}`;
        // Attributes in an ordered way
        var attributeMap = DOM.attributeMap(el);
        var keys = [];
        attributeMap.forEach((v, k) => keys.push(k));
        ListWrapper.sort(keys);
        for (let i = 0; i < keys.length; i++) {
            var key = keys[i];
            var attValue = attributeMap.get(key);
            if (!isString(attValue)) {
                result += ` ${key}`;
            }
            else {
                result += ` ${key}="${attValue}"`;
            }
        }
        result += '>';
        // Children
        var childrenRoot = DOM.templateAwareRoot(el);
        var children = isPresent(childrenRoot) ? DOM.childNodes(childrenRoot) : [];
        for (let j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (!ListWrapper.contains(_singleTagWhitelist, tagName)) {
            result += `</${tagName}>`;
        }
    }
    else if (DOM.isCommentNode(el)) {
        result += `<!--${DOM.nodeValue(el)}-->`;
    }
    else {
        result += DOM.getText(el);
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvdGVzdGluZy91dGlscy50cyJdLCJuYW1lcyI6WyJMb2ciLCJMb2cuY29uc3RydWN0b3IiLCJMb2cuYWRkIiwiTG9nLmZuIiwiTG9nLmNsZWFyIiwiTG9nLnJlc3VsdCIsIkJyb3dzZXJEZXRlY3Rpb24iLCJCcm93c2VyRGV0ZWN0aW9uLmNvbnN0cnVjdG9yIiwiQnJvd3NlckRldGVjdGlvbi5zZXR1cCIsIkJyb3dzZXJEZXRlY3Rpb24uaXNGaXJlZm94IiwiQnJvd3NlckRldGVjdGlvbi5pc0FuZHJvaWQiLCJCcm93c2VyRGV0ZWN0aW9uLmlzRWRnZSIsIkJyb3dzZXJEZXRlY3Rpb24uaXNJRSIsIkJyb3dzZXJEZXRlY3Rpb24uaXNXZWJraXQiLCJCcm93c2VyRGV0ZWN0aW9uLmlzSU9TNyIsIkJyb3dzZXJEZXRlY3Rpb24uaXNTbG93IiwiQnJvd3NlckRldGVjdGlvbi5zdXBwb3J0c0ludGxBcGkiLCJkaXNwYXRjaEV2ZW50IiwiZWwiLCJjb250YWluc1JlZ2V4cCIsIm5vcm1hbGl6ZUNTUyIsInN0cmluZ2lmeUVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZTtPQUNqQyxFQUFDLFdBQVcsRUFBYSxNQUFNLGdDQUFnQztPQUMvRCxFQUFDLEdBQUcsRUFBQyxNQUFNLHVDQUF1QztPQUNsRCxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBUyxNQUFNLDBCQUEwQjtBQUVsRztJQUtFQTtRQUFnQkMsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0E7SUFBQ0EsQ0FBQ0E7SUFFcENELEdBQUdBLENBQUNBLEtBQUtBLElBQVVFLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBRTlDRixFQUFFQSxDQUFDQSxLQUFLQTtRQUNORyxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxFQUFFQSxFQUFFQSxHQUFHQSxJQUFJQSxFQUFFQSxFQUFFQSxHQUFHQSxJQUFJQSxFQUFFQSxFQUFFQSxHQUFHQSxJQUFJQSxFQUFFQSxFQUFFQSxHQUFHQSxJQUFJQSxPQUFPQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFBQTtJQUNqR0EsQ0FBQ0E7SUFFREgsS0FBS0EsS0FBV0ksSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFcENKLE1BQU1BLEtBQWFLLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0FBQ3RETCxDQUFDQTtBQWhCRDtJQUFDLFVBQVUsRUFBRTs7UUFnQlo7QUFFRCxXQUFXLGdCQUFnQixHQUFxQixJQUFJLENBQUM7QUFFckQ7SUFLRU0sWUFBWUEsRUFBVUE7UUFDcEJDLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2xCQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDTkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsWUFBWUEsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDdERBLENBQUNBO0lBQ0hBLENBQUNBO0lBUkRELE9BQU9BLEtBQUtBLEtBQUtFLGdCQUFnQkEsR0FBR0EsSUFBSUEsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQVVqRUYsSUFBSUEsU0FBU0EsS0FBY0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFckVILElBQUlBLFNBQVNBO1FBQ1hJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3hFQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNsRkEsQ0FBQ0E7SUFFREosSUFBSUEsTUFBTUEsS0FBY0ssTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFL0RMLElBQUlBLElBQUlBLEtBQWNNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBRWhFTixJQUFJQSxRQUFRQTtRQUNWTyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNoRkEsQ0FBQ0E7SUFFRFAsSUFBSUEsTUFBTUE7UUFDUlEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FB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Q0FBQ0EsQ0FBQ0E7WUFDeERBLE1BQU1BLElBQUlBLEtBQUtBLE9BQU9BLEdBQUdBLENBQUNBO1FBQzVCQSxDQUFDQTtJQUNIQSxDQUFDQTtJQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQ0EsTUFBTUEsSUFBSUEsT0FBT0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDMUNBLENBQUNBO0lBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ05BLE1BQU1BLElBQUlBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO0lBQzVCQSxDQUFDQTtJQUVEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtBQUNoQkEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc1N0cmluZywgUmVnRXhwV3JhcHBlciwgU3RyaW5nV3JhcHBlciwgUmVnRXhwfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9nIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVzdWx0OiBhbnlbXTtcblxuICBjb25zdHJ1Y3RvcigpIHsgdGhpcy5fcmVzdWx0ID0gW107IH1cblxuICBhZGQodmFsdWUpOiB2b2lkIHsgdGhpcy5fcmVzdWx0LnB1c2godmFsdWUpOyB9XG5cbiAgZm4odmFsdWUpIHtcbiAgICByZXR1cm4gKGExID0gbnVsbCwgYTIgPSBudWxsLCBhMyA9IG51bGwsIGE0ID0gbnVsbCwgYTUgPSBudWxsKSA9PiB7IHRoaXMuX3Jlc3VsdC5wdXNoKHZhbHVlKTsgfVxuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7IHRoaXMuX3Jlc3VsdCA9IFtdOyB9XG5cbiAgcmVzdWx0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9yZXN1bHQuam9pbihcIjsgXCIpOyB9XG59XG5cbmV4cG9ydCB2YXIgYnJvd3NlckRldGVjdGlvbjogQnJvd3NlckRldGVjdGlvbiA9IG51bGw7XG5cbmV4cG9ydCBjbGFzcyBCcm93c2VyRGV0ZWN0aW9uIHtcbiAgcHJpdmF0ZSBfdWE6IHN0cmluZztcblxuICBzdGF0aWMgc2V0dXAoKSB7IGJyb3dzZXJEZXRlY3Rpb24gPSBuZXcgQnJvd3NlckRldGVjdGlvbihudWxsKTsgfVxuXG4gIGNvbnN0cnVjdG9yKHVhOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNQcmVzZW50KHVhKSkge1xuICAgICAgdGhpcy5fdWEgPSB1YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdWEgPSBpc1ByZXNlbnQoRE9NKSA/IERPTS5nZXRVc2VyQWdlbnQoKSA6ICcnO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc0ZpcmVmb3goKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdGaXJlZm94JykgPiAtMTsgfVxuXG4gIGdldCBpc0FuZHJvaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ01vemlsbGEvNS4wJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdBbmRyb2lkJykgPiAtMSAmJlxuICAgICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPT0gLTE7XG4gIH1cblxuICBnZXQgaXNFZGdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID4gLTE7IH1cblxuICBnZXQgaXNJRSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ1RyaWRlbnQnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzV2Via2l0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzSU9TNygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignaVBob25lIE9TIDcnKSA+IC0xIHx8IHRoaXMuX3VhLmluZGV4T2YoJ2lQYWQgT1MgNycpID4gLTE7XG4gIH1cblxuICBnZXQgaXNTbG93KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pc0FuZHJvaWQgfHwgdGhpcy5pc0lFIHx8IHRoaXMuaXNJT1M3OyB9XG5cbiAgLy8gVGhlIEludGwgQVBJIGlzIG9ubHkgcHJvcGVybHkgc3VwcG9ydGVkIGluIHJlY2VudCBDaHJvbWUgYW5kIE9wZXJhLlxuICAvLyBOb3RlOiBFZGdlIGlzIGRpc2d1aXNlZCBhcyBDaHJvbWUgNDIsIHNvIGNoZWNraW5nIHRoZSBcIkVkZ2VcIiBwYXJ0IGlzIG5lZWRlZCxcbiAgLy8gc2VlIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaGg4NjkzMDEodj12cy44NSkuYXNweFxuICBnZXQgc3VwcG9ydHNJbnRsQXBpKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUvNCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGVsZW1lbnQsIGV2ZW50VHlwZSk6IHZvaWQge1xuICBET00uZGlzcGF0Y2hFdmVudChlbGVtZW50LCBET00uY3JlYXRlRXZlbnQoZXZlbnRUeXBlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbChodG1sOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gIHJldHVybiA8SFRNTEVsZW1lbnQ+RE9NLmZpcnN0Q2hpbGQoRE9NLmNvbnRlbnQoRE9NLmNyZWF0ZVRlbXBsYXRlKGh0bWwpKSk7XG59XG5cbnZhciBfUkVfU1BFQ0lBTF9DSEFSUyA9XG4gICAgWyctJywgJ1snLCAnXScsICcvJywgJ3snLCAnfScsICdcXFxcJywgJygnLCAnKScsICcqJywgJysnLCAnPycsICcuJywgJ14nLCAnJCcsICd8J107XG52YXIgX0VTQ0FQRV9SRSA9IFJlZ0V4cFdyYXBwZXIuY3JlYXRlKGBbXFxcXCR7X1JFX1NQRUNJQUxfQ0hBUlMuam9pbignXFxcXCcpfV1gKTtcbmV4cG9ydCBmdW5jdGlvbiBjb250YWluc1JlZ2V4cChpbnB1dDogc3RyaW5nKTogUmVnRXhwIHtcbiAgcmV0dXJuIFJlZ0V4cFdyYXBwZXIuY3JlYXRlKFxuICAgICAgU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKGlucHV0LCBfRVNDQVBFX1JFLCAobWF0Y2gpID0+IGBcXFxcJHttYXRjaFswXX1gKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVDU1MoY3NzOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjc3MgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwoY3NzLCAvXFxzKy9nLCAnICcpO1xuICBjc3MgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwoY3NzLCAvOlxccy9nLCAnOicpO1xuICBjc3MgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwoY3NzLCAvJy9nLCAnXCInKTtcbiAgY3NzID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKGNzcywgLyB9L2csICd9Jyk7XG4gIGNzcyA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChjc3MsIC91cmxcXCgoXFxcInxcXHMpKC4rKShcXFwifFxccylcXCkoXFxzKikvZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtYXRjaCkgPT4gYHVybChcIiR7bWF0Y2hbMl19XCIpYCk7XG4gIGNzcyA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChjc3MsIC9cXFsoLispPShbXlwiXFxdXSspXFxdL2csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobWF0Y2gpID0+IGBbJHttYXRjaFsxXX09XCIke21hdGNoWzJdfVwiXWApO1xuICByZXR1cm4gY3NzO1xufVxuXG52YXIgX3NpbmdsZVRhZ1doaXRlbGlzdCA9IFsnYnInLCAnaHInLCAnaW5wdXQnXTtcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlFbGVtZW50KGVsKTogc3RyaW5nIHtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAoRE9NLmlzRWxlbWVudE5vZGUoZWwpKSB7XG4gICAgdmFyIHRhZ05hbWUgPSBET00udGFnTmFtZShlbCkudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIE9wZW5pbmcgdGFnXG4gICAgcmVzdWx0ICs9IGA8JHt0YWdOYW1lfWA7XG5cbiAgICAvLyBBdHRyaWJ1dGVzIGluIGFuIG9yZGVyZWQgd2F5XG4gICAgdmFyIGF0dHJpYnV0ZU1hcCA9IERPTS5hdHRyaWJ1dGVNYXAoZWwpO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgYXR0cmlidXRlTWFwLmZvckVhY2goKHYsIGspID0+IGtleXMucHVzaChrKSk7XG4gICAgTGlzdFdyYXBwZXIuc29ydChrZXlzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgdmFyIGF0dFZhbHVlID0gYXR0cmlidXRlTWFwLmdldChrZXkpO1xuICAgICAgaWYgKCFpc1N0cmluZyhhdHRWYWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0ICs9IGAgJHtrZXl9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCArPSBgICR7a2V5fT1cIiR7YXR0VmFsdWV9XCJgO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgKz0gJz4nO1xuXG4gICAgLy8gQ2hpbGRyZW5cbiAgICB2YXIgY2hpbGRyZW5Sb290ID0gRE9NLnRlbXBsYXRlQXdhcmVSb290KGVsKTtcbiAgICB2YXIgY2hpbGRyZW4gPSBpc1ByZXNlbnQoY2hpbGRyZW5Sb290KSA/IERPTS5jaGlsZE5vZGVzKGNoaWxkcmVuUm9vdCkgOiBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICByZXN1bHQgKz0gc3RyaW5naWZ5RWxlbWVudChjaGlsZHJlbltqXSk7XG4gICAgfVxuXG4gICAgLy8gQ2xvc2luZyB0YWdcbiAgICBpZiAoIUxpc3RXcmFwcGVyLmNvbnRhaW5zKF9zaW5nbGVUYWdXaGl0ZWxpc3QsIHRhZ05hbWUpKSB7XG4gICAgICByZXN1bHQgKz0gYDwvJHt0YWdOYW1lfT5gO1xuICAgIH1cbiAgfSBlbHNlIGlmIChET00uaXNDb21tZW50Tm9kZShlbCkpIHtcbiAgICByZXN1bHQgKz0gYDwhLS0ke0RPTS5ub2RlVmFsdWUoZWwpfS0tPmA7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ICs9IERPTS5nZXRUZXh0KGVsKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iXX0=