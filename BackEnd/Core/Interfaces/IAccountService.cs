
using Core.Models.Account;

namespace Core.Interfaces;

public interface IAccountService
{
    public Task<string> LoginByGoogle(string token);
    public Task<bool> ForgotPasswordAsync(ForgotPasswordModel model);
}
