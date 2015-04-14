$(document).ready(function () {

    // Get repository
    var repository = $('#repoistoryText').val();
    repository = repository.replace('https://github.com/', '');
    repository = repository.replace('http://github.com/', '');
    repository = repository.replace('github.com/', '');
    if (repository.endsWith("/")) {
        repository = repository.substring(0, repository.length - 1);
    }

    // Get course name
    var course = 'course-original';

    // Get lesson id
    var lesson = 'lesson1';
    var contentid = getParameterByName('contentid');
    if (contentid != '') {
        lesson = contentid;
    }

    // Run flatdoc
    Flatdoc.run({
        fetcher: Flatdoc.github(repository, course + '/' + contentid + '/lesson.md')
    });
})



function loadcontent(contentid) {
    setGetParameter('contentid', contentid);
}

function setGetParameter(paramName, paramValue) {
    var url = window.location.href;
    if (url.indexOf(paramName + "=") >= 0) {
        var prefix = url.substring(0, url.indexOf(paramName));
        var suffix = url.substring(url.indexOf(paramName));
        suffix = suffix.substring(suffix.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
    }
    else {
        if (url.indexOf("?") < 0)
            url += "?" + paramName + "=" + paramValue;
        else
            url += "&" + paramName + "=" + paramValue;
    }
    window.location.href = url;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}