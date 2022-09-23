let resultBoxIsDisplayed = false;

document.querySelector("form").classList.add("form-margin-before-result");

document.querySelector(".btn-primary").addEventListener("click", async function ()
{
    let url = "http://isapi.mekashron.com/soapclient/soapclient.php?URL=http://isapi.icu-tech.com/icutech-test.dll%2Fwsdl%2FIICUTech";

    let password = document.querySelector("#passwordInput").value;

    let email = document.querySelector("#emailInput").value;

    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("func", "Login");
    urlencoded.append("params", `UserName=${email}&Password=${password}&IPs=`);

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: urlencoded,
    };

    let resp = await fetch(url, requestOptions)

    let respBody = await resp.json();

    displayResultBox(JSON.parse(respBody.ret));
}
)

function displayResultBox(respBody)
{

    if (resultBoxIsDisplayed)
    {
        let $statusResult = document.querySelector(".statusResult");
        let $resultTextWrapper = document.querySelector(".resultTextWrapper");

        $resultTextWrapper.innerHTML = "";
        if ($statusResult.classList.contains("errorResponse"))
        {
            $statusResult.classList.remove("errorResponse");
        } else
        {
            $statusResult.classList.remove("okResponse");
        }

        resultTextWriter(respBody, $resultTextWrapper);

        resultColorDisplayer(respBody, $statusResult, $resultTextWrapper);
    } else
    {
        let form = document.querySelector("form");

        form.classList.remove("form-margin-before-result");
        form.classList.add("form-margin-after-result");

        resultBoxIsDisplayed = true;

        let $loginResultWrapper = document.createElement("div");
        let $statusResult = document.createElement("div");
        let $resultTextWrapper = document.createElement("div");

        $loginResultWrapper.classList.add("loginResultWrapper");
        $statusResult.classList.add("statusResult");
        $resultTextWrapper.classList.add("resultTextWrapper")

        resultColorDisplayer(respBody, $statusResult, $resultTextWrapper);
        
        resultTextWriter(respBody, $resultTextWrapper);

        $loginResultWrapper.append($statusResult, $resultTextWrapper);

        document.querySelector(".loginResult").append($loginResultWrapper);
    }

}

function resultTextWriter(respBody, $resultTextWrapper)
{

    for (const key in respBody)
    {
        let $resultText = document.createElement("div");

        $resultText.classList.add("resultText");

        $resultText.textContent = `${key}: ${respBody[key]}`;

        $resultTextWrapper.append($resultText);
    }
}

function resultColorDisplayer(respBody, $statusResult, $resultTextWrapper)
{
    if (respBody.ResultCode == -1)
    {
        $statusResult.classList.add("errorResponse");

    } else
    {
        $statusResult.classList.add("okResponse");
    }
}
