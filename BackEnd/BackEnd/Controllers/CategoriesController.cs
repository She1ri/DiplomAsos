using AutoMapper;
using AutoMapper.QueryableExtensions;
using Bogus.DataSets;
using Core.Models.Category;
using Domain;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController(IMapper mapper,
    AppDbContext appDbContext) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        var categories = appDbContext.Categories
            .Where(p => p.ParentId == null)
            
            .Include(c => c.Children)
                .ThenInclude(c => c.Children)
                .ThenInclude(c => c.Children)
                .AsNoTracking()
                .AsQueryable()
                .OrderByDescending(x=>x.Priority);
                //.ThenInclude(c => c.Children)
            //.ProjectTo<CategoryItemModel>(mapper.ConfigurationProvider)
            //.ToList();
        var model = mapper.Map<CategoryItemModel[]>(categories)
            
            .ToList();

        return Ok(model);
    }
}
