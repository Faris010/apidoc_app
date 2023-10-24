using System.Text.RegularExpressions;

namespace server.Slug;



public static partial class SlugGenerator
{
    public static string GenerateSlug(string projectName)
    {
        if (string.IsNullOrWhiteSpace(projectName))
        {
            throw new ArgumentException("Project name cannot be null or empty");
        }

        // Remove special characters and spaces
        string slug = MyRegex().Replace(projectName, "-");

        // Remove leading and trailing hyphens
        slug = slug.Trim('-');

        // Convert to lowercase
        slug = slug.ToLower();

        return slug;
    }

    [GeneratedRegex("[^a-zA-Z0-9]+")]
    private static partial Regex MyRegex();
}
