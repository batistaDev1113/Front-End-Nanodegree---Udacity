/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('urls are defined', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        it('names are not empty', function () {
            for (const names of allFeeds) {
                expect(names.name).toBeDefined();
                expect(names.name.length).not.toBe(0);
            }
        });
    });


    describe('The menu', function () {
        let body = document.querySelector('body');
        it('is hidden', function () {
            expect(body.classList.contains('menu-hidden')).toBe(true);

        });

        it('changes visibility when clicked', function () {
            const menu = document.querySelector('.menu-icon-link');
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

    });



    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('at least have one entry', function () {
            const feeds = document.querySelectorAll('.feed > .entry-link');
            expect(feeds.length > 0).toBe(true);
        });

    });

    describe('New Feed Selection', function () {

        const newFeed = document.querySelector('.feed');
        const feedsArray = [];


        beforeEach(function (done) {
            loadFeed(0, function () {
                Array.from(newFeed.children).forEach(function (e) {
                    feedsArray.push(e.innerText);
                    console.log(feedsArray);
                });
                loadFeed(1, done);

            });


        });

        it('makes content change', function () {
            Array.from(newFeed.children).forEach(function (feed, index) {
                expect(feed.innerText === feedsArray[index]).toBe(false);
            });


        });




    });

}());
