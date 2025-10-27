using AutoMapper;
using Core.Models.Category;
using Core.Models.Seeder;
using Domain.Entities;

namespace Core.Mappers;

public class CategoryMapper : Profile
{
    public CategoryMapper()
    {
        CreateMap<CategoryEntity, CategoryItemModel>();

        CreateMap<SeederCategoryModel, CategoryEntity>();

        CreateMap<CategoryCreateModel, CategoryEntity>()
            .ForMember(x => x.Name, opt => opt.MapFrom(x => x.Name.Trim()))
            .ForMember(x => x.Image, opt => opt.Ignore());

        CreateMap<CategoryUpdateModel, CategoryEntity>()
            .ForMember(x => x.Name, opt => opt.MapFrom(x => x.Name.Trim()))
            .ForMember(x => x.Image, opt => opt.Ignore());
    }
}
