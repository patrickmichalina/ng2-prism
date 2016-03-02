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
import { SourceModule, SourceExpression, moduleRef } from './source_module';
import { ViewEncapsulation } from 'angular2/src/core/metadata/view';
import { XHR } from 'angular2/src/compiler/xhr';
import { IS_DART, isBlank } from 'angular2/src/facade/lang';
import { PromiseWrapper } from 'angular2/src/facade/async';
import { ShadowCss } from 'angular2/src/compiler/shadow_css';
import { UrlResolver } from 'angular2/src/compiler/url_resolver';
import { extractStyleUrls } from './style_url_resolver';
import { escapeSingleQuoteString, codeGenExportVariable, MODULE_SUFFIX } from './util';
import { Injectable } from 'angular2/src/core/di';
const COMPONENT_VARIABLE = '%COMP%';
const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
export let StyleCompiler = class {
    constructor(_xhr, _urlResolver) {
        this._xhr = _xhr;
        this._urlResolver = _urlResolver;
        this._styleCache = new Map();
        this._shadowCss = new ShadowCss();
    }
    compileComponentRuntime(template) {
        var styles = template.styles;
        var styleAbsUrls = template.styleUrls;
        return this._loadStyles(styles, styleAbsUrls, template.encapsulation === ViewEncapsulation.Emulated);
    }
    compileComponentCodeGen(template) {
        var shim = template.encapsulation === ViewEncapsulation.Emulated;
        return this._styleCodeGen(template.styles, template.styleUrls, shim);
    }
    compileStylesheetCodeGen(stylesheetUrl, cssText) {
        var styleWithImports = extractStyleUrls(this._urlResolver, stylesheetUrl, cssText);
        return [
            this._styleModule(stylesheetUrl, false, this._styleCodeGen([styleWithImports.style], styleWithImports.styleUrls, false)),
            this._styleModule(stylesheetUrl, true, this._styleCodeGen([styleWithImports.style], styleWithImports.styleUrls, true))
        ];
    }
    clearCache() { this._styleCache.clear(); }
    _loadStyles(plainStyles, absUrls, encapsulate) {
        var promises = absUrls.map((absUrl) => {
            var cacheKey = `${absUrl}${encapsulate ? '.shim' : ''}`;
            var result = this._styleCache.get(cacheKey);
            if (isBlank(result)) {
                result = this._xhr.get(absUrl).then((style) => {
                    var styleWithImports = extractStyleUrls(this._urlResolver, absUrl, style);
                    return this._loadStyles([styleWithImports.style], styleWithImports.styleUrls, encapsulate);
                });
                this._styleCache.set(cacheKey, result);
            }
            return result;
        });
        return PromiseWrapper.all(promises).then((nestedStyles) => {
            var result = plainStyles.map(plainStyle => this._shimIfNeeded(plainStyle, encapsulate));
            nestedStyles.forEach(styles => result.push(styles));
            return result;
        });
    }
    _styleCodeGen(plainStyles, absUrls, shim) {
        var arrayPrefix = IS_DART ? `const` : '';
        var styleExpressions = plainStyles.map(plainStyle => escapeSingleQuoteString(this._shimIfNeeded(plainStyle, shim)));
        for (var i = 0; i < absUrls.length; i++) {
            var moduleUrl = this._createModuleUrl(absUrls[i], shim);
            styleExpressions.push(`${moduleRef(moduleUrl)}STYLES`);
        }
        var expressionSource = `${arrayPrefix} [${styleExpressions.join(',')}]`;
        return new SourceExpression([], expressionSource);
    }
    _styleModule(stylesheetUrl, shim, expression) {
        var moduleSource = `
      ${expression.declarations.join('\n')}
      ${codeGenExportVariable('STYLES')}${expression.expression};
    `;
        return new SourceModule(this._createModuleUrl(stylesheetUrl, shim), moduleSource);
    }
    _shimIfNeeded(style, shim) {
        return shim ? this._shadowCss.shimCssText(style, CONTENT_ATTR, HOST_ATTR) : style;
    }
    _createModuleUrl(stylesheetUrl, shim) {
        return shim ? `${stylesheetUrl}.shim${MODULE_SUFFIX}` : `${stylesheetUrl}${MODULE_SUFFIX}`;
    }
};
StyleCompiler = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [XHR, UrlResolver])
], StyleCompiler);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVfY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvY29tcGlsZXIvc3R5bGVfY29tcGlsZXIudHMiXSwibmFtZXMiOlsiU3R5bGVDb21waWxlciIsIlN0eWxlQ29tcGlsZXIuY29uc3RydWN0b3IiLCJTdHlsZUNvbXBpbGVyLmNvbXBpbGVDb21wb25lbnRSdW50aW1lIiwiU3R5bGVDb21waWxlci5jb21waWxlQ29tcG9uZW50Q29kZUdlbiIsIlN0eWxlQ29tcGlsZXIuY29tcGlsZVN0eWxlc2hlZXRDb2RlR2VuIiwiU3R5bGVDb21waWxlci5jbGVhckNhY2hlIiwiU3R5bGVDb21waWxlci5fbG9hZFN0eWxlcyIsIlN0eWxlQ29tcGlsZXIuX3N0eWxlQ29kZUdlbiIsIlN0eWxlQ29tcGlsZXIuX3N0eWxlTW9kdWxlIiwiU3R5bGVDb21waWxlci5fc2hpbUlmTmVlZGVkIiwiU3R5bGVDb21waWxlci5fY3JlYXRlTW9kdWxlVXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FDTyxFQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUMsTUFBTSxpQkFBaUI7T0FDbEUsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlDQUFpQztPQUMxRCxFQUFDLEdBQUcsRUFBQyxNQUFNLDJCQUEyQjtPQUN0QyxFQUFDLE9BQU8sRUFBaUIsT0FBTyxFQUFDLE1BQU0sMEJBQTBCO09BQ2pFLEVBQUMsY0FBYyxFQUFDLE1BQU0sMkJBQTJCO09BQ2pELEVBQUMsU0FBUyxFQUFDLE1BQU0sa0NBQWtDO09BQ25ELEVBQUMsV0FBVyxFQUFDLE1BQU0sb0NBQW9DO09BQ3ZELEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0I7T0FDOUMsRUFDTCx1QkFBdUIsRUFDdkIscUJBQXFCLEVBRXJCLGFBQWEsRUFDZCxNQUFNLFFBQVE7T0FDUixFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQjtBQUUvQyxNQUFNLGtCQUFrQixHQUFHLFFBQVEs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QSxDQUFDQTtJQUNwRkEsQ0FBQ0E7SUFFT1IsYUFBYUEsQ0FBQ0EsS0FBYUEsRUFBRUEsSUFBYUE7UUFDaERTLE1BQU1BLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLEVBQUVBLFlBQVlBLEVBQUVBLFNBQVNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO0lBQ3BGQSxDQUFDQTtJQUVPVCxnQkFBZ0JBLENBQUNBLGFBQXFCQSxFQUFFQSxJQUFhQTtRQUMzRFUsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsR0FBR0EsYUFBYUEsUUFBUUEsYUFBYUEsRUFBRUEsR0FBR0EsR0FBR0EsYUFBYUEsR0FBR0EsYUFBYUEsRUFBRUEsQ0FBQ0E7SUFDN0ZBLENBQUNBO0FBQ0hWLENBQUNBO0FBcEZEO0lBQUMsVUFBVSxFQUFFOztrQkFvRlo7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcGlsZVR5cGVNZXRhZGF0YSwgQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGF9IGZyb20gJy4vZGlyZWN0aXZlX21ldGFkYXRhJztcbmltcG9ydCB7U291cmNlTW9kdWxlLCBTb3VyY2VFeHByZXNzaW9uLCBtb2R1bGVSZWZ9IGZyb20gJy4vc291cmNlX21vZHVsZSc7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS92aWV3JztcbmltcG9ydCB7WEhSfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIveGhyJztcbmltcG9ydCB7SVNfREFSVCwgU3RyaW5nV3JhcHBlciwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtTaGFkb3dDc3N9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zaGFkb3dfY3NzJztcbmltcG9ydCB7VXJsUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci91cmxfcmVzb2x2ZXInO1xuaW1wb3J0IHtleHRyYWN0U3R5bGVVcmxzfSBmcm9tICcuL3N0eWxlX3VybF9yZXNvbHZlcic7XG5pbXBvcnQge1xuICBlc2NhcGVTaW5nbGVRdW90ZVN0cmluZyxcbiAgY29kZUdlbkV4cG9ydFZhcmlhYmxlLFxuICBjb2RlR2VuVG9TdHJpbmcsXG4gIE1PRFVMRV9TVUZGSVhcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuXG5jb25zdCBDT01QT05FTlRfVkFSSUFCTEUgPSAnJUNPTVAlJztcbmNvbnN0IEhPU1RfQVRUUiA9IGBfbmdob3N0LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5jb25zdCBDT05URU5UX0FUVFIgPSBgX25nY29udGVudC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3R5bGVDb21waWxlciB7XG4gIHByaXZhdGUgX3N0eWxlQ2FjaGU6IE1hcDxzdHJpbmcsIFByb21pc2U8c3RyaW5nW10+PiA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlPHN0cmluZ1tdPj4oKTtcbiAgcHJpdmF0ZSBfc2hhZG93Q3NzOiBTaGFkb3dDc3MgPSBuZXcgU2hhZG93Q3NzKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfeGhyOiBYSFIsIHByaXZhdGUgX3VybFJlc29sdmVyOiBVcmxSZXNvbHZlcikge31cblxuICBjb21waWxlQ29tcG9uZW50UnVudGltZSh0ZW1wbGF0ZTogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEpOiBQcm9taXNlPEFycmF5PHN0cmluZyB8IGFueVtdPj4ge1xuICAgIHZhciBzdHlsZXMgPSB0ZW1wbGF0ZS5zdHlsZXM7XG4gICAgdmFyIHN0eWxlQWJzVXJscyA9IHRlbXBsYXRlLnN0eWxlVXJscztcbiAgICByZXR1cm4gdGhpcy5fbG9hZFN0eWxlcyhzdHlsZXMsIHN0eWxlQWJzVXJscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5lbmNhcHN1bGF0aW9uID09PSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZCk7XG4gIH1cblxuICBjb21waWxlQ29tcG9uZW50Q29kZUdlbih0ZW1wbGF0ZTogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEpOiBTb3VyY2VFeHByZXNzaW9uIHtcbiAgICB2YXIgc2hpbSA9IHRlbXBsYXRlLmVuY2Fwc3VsYXRpb24gPT09IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkO1xuICAgIHJldHVybiB0aGlzLl9zdHlsZUNvZGVHZW4odGVtcGxhdGUuc3R5bGVzLCB0ZW1wbGF0ZS5zdHlsZVVybHMsIHNoaW0pO1xuICB9XG5cbiAgY29tcGlsZVN0eWxlc2hlZXRDb2RlR2VuKHN0eWxlc2hlZXRVcmw6IHN0cmluZywgY3NzVGV4dDogc3RyaW5nKTogU291cmNlTW9kdWxlW10ge1xuICAgIHZhciBzdHlsZVdpdGhJbXBvcnRzID0gZXh0cmFjdFN0eWxlVXJscyh0aGlzLl91cmxSZXNvbHZlciwgc3R5bGVzaGVldFVybCwgY3NzVGV4dCk7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuX3N0eWxlTW9kdWxlKFxuICAgICAgICAgIHN0eWxlc2hlZXRVcmwsIGZhbHNlLFxuICAgICAgICAgIHRoaXMuX3N0eWxlQ29kZUdlbihbc3R5bGVXaXRoSW1wb3J0cy5zdHlsZV0sIHN0eWxlV2l0aEltcG9ydHMuc3R5bGVVcmxzLCBmYWxzZSkpLFxuICAgICAgdGhpcy5fc3R5bGVNb2R1bGUoc3R5bGVzaGVldFVybCwgdHJ1ZSwgdGhpcy5fc3R5bGVDb2RlR2VuKFtzdHlsZVdpdGhJbXBvcnRzLnN0eWxlXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZVdpdGhJbXBvcnRzLnN0eWxlVXJscywgdHJ1ZSkpXG4gICAgXTtcbiAgfVxuXG4gIGNsZWFyQ2FjaGUoKSB7IHRoaXMuX3N0eWxlQ2FjaGUuY2xlYXIoKTsgfVxuXG4gIHByaXZhdGUgX2xvYWRTdHlsZXMocGxhaW5TdHlsZXM6IHN0cmluZ1tdLCBhYnNVcmxzOiBzdHJpbmdbXSxcbiAgICAgICAgICAgICAgICAgICAgICBlbmNhcHN1bGF0ZTogYm9vbGVhbik6IFByb21pc2U8QXJyYXk8c3RyaW5nIHwgYW55W10+PiB7XG4gICAgdmFyIHByb21pc2VzID0gYWJzVXJscy5tYXAoKGFic1VybCkgPT4ge1xuICAgICAgdmFyIGNhY2hlS2V5ID0gYCR7YWJzVXJsfSR7ZW5jYXBzdWxhdGUgPyAnLnNoaW0nIDogJyd9YDtcbiAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9zdHlsZUNhY2hlLmdldChjYWNoZUtleSk7XG4gICAgICBpZiAoaXNCbGFuayhyZXN1bHQpKSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX3hoci5nZXQoYWJzVXJsKS50aGVuKChzdHlsZSkgPT4ge1xuICAgICAgICAgIHZhciBzdHlsZVdpdGhJbXBvcnRzID0gZXh0cmFjdFN0eWxlVXJscyh0aGlzLl91cmxSZXNvbHZlciwgYWJzVXJsLCBzdHlsZSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRTdHlsZXMoW3N0eWxlV2l0aEltcG9ydHMuc3R5bGVdLCBzdHlsZVdpdGhJbXBvcnRzLnN0eWxlVXJscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNhcHN1bGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9zdHlsZUNhY2hlLnNldChjYWNoZUtleSwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLmFsbChwcm9taXNlcykudGhlbigobmVzdGVkU3R5bGVzOiBzdHJpbmdbXVtdKSA9PiB7XG4gICAgICB2YXIgcmVzdWx0OiBBcnJheTxzdHJpbmcgfCBhbnlbXT4gPVxuICAgICAgICAgIHBsYWluU3R5bGVzLm1hcChwbGFpblN0eWxlID0+IHRoaXMuX3NoaW1JZk5lZWRlZChwbGFpblN0eWxlLCBlbmNhcHN1bGF0ZSkpO1xuICAgICAgbmVzdGVkU3R5bGVzLmZvckVhY2goc3R5bGVzID0+IHJlc3VsdC5wdXNoKHN0eWxlcykpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3N0eWxlQ29kZUdlbihwbGFpblN0eWxlczogc3RyaW5nW10sIGFic1VybHM6IHN0cmluZ1tdLCBzaGltOiBib29sZWFuKTogU291cmNlRXhwcmVzc2lvbiB7XG4gICAgdmFyIGFycmF5UHJlZml4ID0gSVNfREFSVCA/IGBjb25zdGAgOiAnJztcbiAgICB2YXIgc3R5bGVFeHByZXNzaW9ucyA9IHBsYWluU3R5bGVzLm1hcChcbiAgICAgICAgcGxhaW5TdHlsZSA9PiBlc2NhcGVTaW5nbGVRdW90ZVN0cmluZyh0aGlzLl9zaGltSWZOZWVkZWQocGxhaW5TdHlsZSwgc2hpbSkpKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWJzVXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG1vZHVsZVVybCA9IHRoaXMuX2NyZWF0ZU1vZHVsZVVybChhYnNVcmxzW2ldLCBzaGltKTtcbiAgICAgIHN0eWxlRXhwcmVzc2lvbnMucHVzaChgJHttb2R1bGVSZWYobW9kdWxlVXJsKX1TVFlMRVNgKTtcbiAgICB9XG4gICAgdmFyIGV4cHJlc3Npb25Tb3VyY2UgPSBgJHthcnJheVByZWZpeH0gWyR7c3R5bGVFeHByZXNzaW9ucy5qb2luKCcsJyl9XWA7XG4gICAgcmV0dXJuIG5ldyBTb3VyY2VFeHByZXNzaW9uKFtdLCBleHByZXNzaW9uU291cmNlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N0eWxlTW9kdWxlKHN0eWxlc2hlZXRVcmw6IHN0cmluZywgc2hpbTogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogU291cmNlRXhwcmVzc2lvbik6IFNvdXJjZU1vZHVsZSB7XG4gICAgdmFyIG1vZHVsZVNvdXJjZSA9IGBcbiAgICAgICR7ZXhwcmVzc2lvbi5kZWNsYXJhdGlvbnMuam9pbignXFxuJyl9XG4gICAgICAke2NvZGVHZW5FeHBvcnRWYXJpYWJsZSgnU1RZTEVTJyl9JHtleHByZXNzaW9uLmV4cHJlc3Npb259O1xuICAgIGA7XG4gICAgcmV0dXJuIG5ldyBTb3VyY2VNb2R1bGUodGhpcy5fY3JlYXRlTW9kdWxlVXJsKHN0eWxlc2hlZXRVcmwsIHNoaW0pLCBtb2R1bGVTb3VyY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hpbUlmTmVlZGVkKHN0eWxlOiBzdHJpbmcsIHNoaW06IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIHJldHVybiBzaGltID8gdGhpcy5fc2hhZG93Q3NzLnNoaW1Dc3NUZXh0KHN0eWxlLCBDT05URU5UX0FUVFIsIEhPU1RfQVRUUikgOiBzdHlsZTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZU1vZHVsZVVybChzdHlsZXNoZWV0VXJsOiBzdHJpbmcsIHNoaW06IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIHJldHVybiBzaGltID8gYCR7c3R5bGVzaGVldFVybH0uc2hpbSR7TU9EVUxFX1NVRkZJWH1gIDogYCR7c3R5bGVzaGVldFVybH0ke01PRFVMRV9TVUZGSVh9YDtcbiAgfVxufVxuIl19