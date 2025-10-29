using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("tblCategories")]
public class CategoryEntity : BaseEntity<int>
{
    [Required, StringLength(255)]
    public string Name { get; set; } = string.Empty;
    [StringLength(200)]
    public string? Image { get; set; }
    //Послідовність відображення категорій
    public int Priority { get; set; }

    public string? Description { get; set; }

    [ForeignKey(nameof(Parent))]
    public int? ParentId { get; set; }
    public CategoryEntity? Parent { get; set; }

    public virtual ICollection<CategoryEntity>? Children { get; set; }
}
