
using Core.Interfaces;
using Core.Models.Account;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController(IAccountService accountService, ISmtpService smtpService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequestModel model)
    {
        string result = await accountService.LoginByGoogle(model.Token);
        if (string.IsNullOrEmpty(result))
        {
            return BadRequest(new
            {
                Status = 400,
                IsValid = false,
                Errors = new { Email = "Помилка реєстрації" }
            });
        }
        await smtpService.SendEmailAsync(new Core.SMTP.EmailMessage
        {
            Subject = "subject",
            Body = "тестуємо пошту",
            To = "alexshelepalo8@gmail.com"
        });
        return Ok(new
        {
            Token = result
        });
    }
}
