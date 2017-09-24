/**
 * Switch to the given tab number in the current window.
 *
 * @param {int} num - 1-based tab index, -1 for last tab.
 */
function activateTab(num) {
    browser.windows.getCurrent({populate: true}).then(function(window) {
        var idx = (num <= 0) ? window.tabs.length - 1 : num - 1;
        browser.tabs.update(window.tabs[idx].id, {active: true});
    })
}

browser.commands.onCommand.addListener(function(command) {
    console.log("onCommand " + command);
    var m = /tab(\d)/.exec(command);
    if (m) {
        var n = parseInt(m[1]);
        if (n > 0 && n < 9) {
            console.log("Activating tab " + n);
            activateTab(n);
        }
        else if (n == 9) {
            console.log("Activating last tab");
            activateTab(-1);
        }
        else {
            console.log("Tab number must be between 1 and 9, got " + n)
        }
    }
});
