// ==UserScript==
// @name         Clic automático en "continuar con interrupciones"
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Haz clic automáticamente en el enlace "continuar con interrupciones" cuando aparezca
// @author       Dhani Arellano
// @include *songsterr.com*
// @include songsterr.com*
// @include *songsterr.com
// @include songsterr.com
// @include www.songsterr.com*
// @include http://songsterr.com/*
// @include http://*.songsterr.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Función para verificar y hacer clic en el elemento
    function checkAndClick() {
        // Buscar el párrafo con la clase específica
        const targetParagraph = document.querySelector('p.rq1ph');

        if (targetParagraph) {
            // Verificar si contiene el texto y enlace esperado
            const link = targetParagraph.querySelector('a[href=""]');
            if (link && targetParagraph.textContent.includes('continuar con interrupciones')) {
                console.log('Elemento encontrado, haciendo clic...');
                link.click();
                return true; // Indica que se encontró y se hizo clic
            }
        }
        return false; // Indica que no se encontró
    }

    // Ejecutar inmediatamente al cargar la página
    if (!checkAndClick()) {
        // Si no se encontró inicialmente, configurar un observador de mutaciones
        const observer = new MutationObserver(function(mutations) {
            checkAndClick();
        });

        // Configurar y comenzar a observar cambios en el DOM
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();