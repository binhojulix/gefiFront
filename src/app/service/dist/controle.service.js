"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ControleService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../environments/environment");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var apiUrl = environment_1.environment.apiUrl + "/associacoes";
var ControleService = /** @class */ (function () {
    function ControleService(http) {
        this.http = http;
    }
    ControleService.prototype.getControles = function () {
        return this.http.get(apiUrl)
            .pipe(operators_1.tap(function (controles) { return console.log('leu os Controles'); }), operators_1.catchError(this.handleError('getControles', [])));
    };
    ControleService.prototype.getControlesDoUsuario = function () {
        return this.http.get(apiUrl)
            .pipe(operators_1.tap(function (controles) { return console.log('leu os Controles'); }), operators_1.catchError(this.handleError('getControlesDoUsuario', [])));
    };
    ControleService.prototype.getControle = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.get(url).pipe(operators_1.tap(function (_) { return console.log("leu o Controle id=" + id); }), operators_1.catchError(this.handleError("getControle id=" + id)));
    };
    ControleService.prototype.addControle = function (Controle) {
        return this.http.post(apiUrl, Controle, httpOptions).pipe(
        // tslint:disable-next-line:no-shadowed-variable
        operators_1.tap(function (Controle) { return console.log("adicionou o produto com w/ id=" + Controle.id_usuario_equipamento); }), operators_1.catchError(this.handleError('addControle')));
    };
    ControleService.prototype.updateControle = function (controle) {
        var url = apiUrl + "/" + controle.id_usuario_equipamento;
        return this.http.put(url, controle, httpOptions).pipe(operators_1.tap(function (_) { return console.log("atualiza o Controle com id=" + controle.id_usuario_equipamento); }), operators_1.catchError(this.handleError('updateControle')));
    };
    ControleService.prototype.deleteControle = function (id) {
        var url = apiUrl + "/delete/" + id;
        return this.http["delete"](url, httpOptions).pipe(operators_1.tap(function (_) { return console.log("remove o usuario com id=" + id); }), operators_1.catchError(this.handleError('deleteControle')));
    };
    ControleService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.error(error);
            return rxjs_1.of(result);
        };
    };
    ControleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ControleService);
    return ControleService;
}());
exports.ControleService = ControleService;
