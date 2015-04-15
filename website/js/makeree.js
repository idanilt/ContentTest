$(document).ready(function () {

    // Get repository
    var repository = $('#repoistoryText').val();
    repository = repository.replace('https://github.com/', '');
    repository = repository.replace('http://github.com/', '');
    repository = repository.replace('github.com/', '');
    if (repository.endsWith("/")) {
        repository = repository.substring(0, repository.length - 1);
    }

    // Generate menus
    GenerateCoursesMenu(repository);

    // Get course name
    var course = '';
    var courseid = getParameterByName('courseid');
    if (courseid != '') {
        course = courseid;
    }
    else
    {
        var firstCourse = $("#courses a:first-child");
        if (firstCourse != null) {
            course = firstCourse.text().trim();
        }
    }

    // Generate menus
    GenerateLessonsMenu(repository, course);

    // Get lesson id
    var lesson = '';
    var lessonid = getParameterByName('lessonid');
    if (lessonid != '') {
        lesson = lessonid;
    }
    else
    {
        var firstLesson = $("#lessons a:first-child");
        if (firstLesson != null) {
            lesson = firstLesson.text();
        }
    }

    // Run flatdoc
    Flatdoc.run({
        fetcher: Flatdoc.github(repository, 'courses/' + course + '/' + lesson + '/lesson.md')
    });
})

function GenerateCoursesMenu(repository)
{
    // Fetch courses folder from git
    var url = 'https://api.github.com/repos/' + repository + '/contents/courses';
    $.ajax({
        url: url,
        success: function (data) {

            for (var index = 0; index < data.length; index++) {
                var courseLink = $("<a/>", {
                    href: "",
                    text: data[index].name,
                    onclick: "loadcourse('" + data[index].name + "')"
                });
                $("#courses").append(courseLink);
            }
        },
        async: false
    }
    );
}

function GenerateLessonsMenu(repository, course) {

    debugger
    // Fetch lessons folder from git
    var url = 'https://api.github.com/repos/' + repository + '/contents/courses/' + course;
    $.ajax({
        url: url,
        success: function (data) {

            for (var index = 0; index < data.length; index++) {
                var lessonLink = $("<a/>", {
                    href: "",
                    text: data[index].name,
                    onclick: "loadlesson('" + data[index].name + "')"
                });
                $("#lessons").append(lessonLink);
            }
        },
        async: false
    }
    );
}

function loadlesson(lessonid) {
    setGetParameter('lessonid', lessonid);
}


function loadcourse(course) {
    setGetParameter('courseid', course);
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