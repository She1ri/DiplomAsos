using Domain.Entities;

namespace Core.Models.Category;

public class CategoryItemModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Image { get; set; } = string.Empty;
    public int Priority { get; set; }
    public IList<CategoryItemModel>? Children { get; set; }
}
