const apiUrl = "http://localhost:3000/";

const getApiData = async function () {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const postApiData = async function (task) {
    try {
        const postData = task;
        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const deleteApiData = async function (taskId) {
    try {
        const apiDeleteUrl = `${apiUrl}${taskId}`;
        await fetch(apiDeleteUrl, {
            method: "DELETE",

        })

    } catch (error) {
        console.log(error);
    }
}

const changeApiDataTaskDone = async function (taskId, state) {
    try {
        const apiChangeUrl = `${apiUrl}${taskId}`;
        const postData = { done: state };
        await fetch(apiChangeUrl, {
            method: "PUT",
            body: JSON.stringify(postData),
            headers: {
                "content-type": "application/json"
            }
        })

    } catch (error) {
        console.log(error);
    }
}
