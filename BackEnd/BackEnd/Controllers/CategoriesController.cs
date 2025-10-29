using AutoMapper;
using AutoMapper.QueryableExtensions;
using Bogus.DataSets;
using Core.Models.Category;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController(IMapper mapper,
    AppDbContext appDbContext) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        var model = appDbContext.Categories
            .ProjectTo<CategoryItemModel>(mapper.ConfigurationProvider)
            .ToList();
        return Ok(model);
    }
}
