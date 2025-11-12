
using AutoMapper;
using Core.Constants;
using Core.Interfaces;
using Core.Models.Account;
using Core.Services;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController(IAccountService accountService, ISmtpService smtpService, IMapper mapper, IImageService imageService,
    UserManager<UserEntity> userManager, IJwtTokenService jwtTokenService) : ControllerBase
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
    [HttpPost]
    public async Task<IActionResult> Register([FromForm] RegisterModel model)
    {
        var user = mapper.Map<UserEntity>(model);

        user.Image = await imageService.SaveImageAsync(model.ImageFile!);

        var result = await userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(user, Roles.User);
            var token = await jwtTokenService.CreateTokenAsync(user);
            return Ok(new
            {
                Token = token
            });
        }
        else
        { 
            string data = "";
            foreach(var eror in result.Errors)
            {
                data += eror.Description + " ";
            }
            

            return BadRequest(new
            {
                status = 400,
                isValid = false,
                errors = data
            });
        }

    }
    [HttpPost]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
    {
        var result = await accountService.ResetPasswordAsync(model);

        if(result)
            return Ok();

        return BadRequest();
    }
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);
        if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
        {
            var token = await jwtTokenService.CreateTokenAsync(user);
            return Ok(new { Token = token });
        }
        return Unauthorized("Invalid email or password");
    }
    [HttpPost]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
    {
        bool res = await accountService.ForgotPasswordAsync(model);
        if (res)
            return Ok();
        else
            return BadRequest(new
            {
                Status = 400,
                IsValid = false,
                Errors = new { Email = "Користувача з такою поштою не існує" }
            });
    }
}