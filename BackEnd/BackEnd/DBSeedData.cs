using AutoMapper;
using Core.Interfaces;
using Core.Models.Seeder;
using Domain;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Text.Json;

namespace WebApiATB;

public static class DbSeedData
{
    public static async Task SeedData(this WebApplication webApplication)
    {
        var scoped = webApplication.Services.CreateScope();
        var context = scoped.ServiceProvider.GetRequiredService<AppDbContext>();
        var mapper = scoped.ServiceProvider.GetRequiredService<IMapper>();
        var imageService = scoped.ServiceProvider.GetRequiredService<IImageService>();

        await context.Database.MigrateAsync();

        if (!context.Categories.Any())
        {
            var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "Categories.json");
            if (File.Exists(jsonFile))
            {
                var jsonData = await File.ReadAllTextAsync(jsonFile);
                try
                {
                    var categories = JsonConvert.DeserializeObject<List<SeederCategoryModel>>(jsonData);
                    if (categories != null && categories.Count > 0)
                    {
                        var entities = mapper.Map<List<CategoryEntity>>(categories);
                        foreach (var rootCategory in entities)
                        {
                            TraverseCategories(rootCategory, category =>
                            {
                                if (!string.IsNullOrEmpty(category.Image))
                                {
                                    Console.WriteLine($"{category.Name} -> {category.Image}");
                                    category.Image=imageService
                                    .SaveImageFromUrlAsync(category.Image).Result;
                                }
                            });
                        }
                        await context.AddRangeAsync(entities);
                        await context.SaveChangesAsync();
                    }
                    

                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error Json Parse Data {0}", ex.Message);
                }
            }
            else
            {
                Console.WriteLine("Not Found File Categories.json");
            }
        }
    }

    public static void TraverseCategories(CategoryEntity category, Action<CategoryEntity> action)
    {
        if (category == null) return;

        // Викликаємо дію (наприклад, збереження картинки)
        action(category);

        // Рекурсивно обходимо підкатегорії
        if (category.Children != null)
        {
            foreach (var child in category.Children)
            {
                TraverseCategories(child, action);
            }
        }
    }
}