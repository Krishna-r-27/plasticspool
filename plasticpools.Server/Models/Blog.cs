namespace plasticpools.Server.Models
{
    public class Blog
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string ?Description1 { get; set; }

        public string? Description2 { get; set; }

        public string? Image { get; set; }

        public string? Seo_Title { get; set; }

        public string? Seo_Meta_Description { get; set; }

        public bool? Visible { get; set; } = true;
    }
}
